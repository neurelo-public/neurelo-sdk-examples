# pyright: reportPrivateImportUsage=false

import os
from pathlib import Path
from typing import Annotated, List

import bcrypt
from dotenv import load_dotenv
from fastapi import (
    Cookie,
    FastAPI,
    HTTPException,
    Request,
    status,
    Depends,
    Form,
    Query,
)
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
import jwt
from pydantic import StrictInt

from src.core.repos import Api, models

load_dotenv(".env.local")

SRC_PATH = Path(__file__).parent
TEMPLATES_PATH = SRC_PATH / "templates"
STATICS_PATH = SRC_PATH.parent / "static"
JWT_SECRET = os.getenv("JWT_SECRET") or ""
NEURELO_API_HOST = os.getenv("NEURELO_API_HOST") or ""
NEURELO_API_KEY = os.getenv("NEURELO_API_KEY") or ""

if not all([JWT_SECRET, NEURELO_API_HOST, NEURELO_API_KEY]):
    raise AttributeError(
        "NEURELO_API_HOST and NEURELO_API_KEY are required env variables"
    )

API_CLIENT = Api(NEURELO_API_HOST, NEURELO_API_KEY)

app = FastAPI()

templates = Jinja2Templates(directory=TEMPLATES_PATH)

app.mount("/static", StaticFiles(directory=STATICS_PATH), name="static")


def user_to_jwt(user: models.User):
    payload = {"id": user.id, "email": user.email, "fullname": user.fullname}
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")


def user_from_cookie(session: str = Cookie(default="")):
    try:
        payload = jwt.decode(session, JWT_SECRET, algorithms=["HS256"])
        return models.User.from_dict(payload)
    except:
        return None



@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse("landing.html", {"request": request})


@app.get("/register", response_class=HTMLResponse)
async def register_form(request: Request):
    return templates.TemplateResponse("register-form.html", {"request": request})


@app.post("/register", response_class=HTMLResponse)
async def register(
    api: Annotated[Api, Depends(API_CLIENT)],
    email: Annotated[str, Form()],
    fullname: Annotated[str, Form()],
    password: Annotated[str, Form()],
):
    salt = bcrypt.gensalt()
    password = bcrypt.hashpw(bytes(password, "utf-8"), salt).decode("utf-8")

    payload = models.UserCreateInput(
        email=email,
        fullname=fullname,
        password=password,
    )

    try:
        api.user_api.create_one_user(payload)
    except Exception as e:
        return response_500(e)

    return RedirectResponse("/login", status_code=status.HTTP_303_SEE_OTHER)


@app.get("/login", response_class=HTMLResponse)
async def login_form(request: Request):
    return templates.TemplateResponse("login.html", {"request": request})


@app.post("/login", response_class=HTMLResponse)
async def login(
    api: Annotated[Api, Depends(API_CLIENT)],
    email: Annotated[str, Form()],
    password: Annotated[str, Form()],
):
    try:
        filter = models.UserWhereInput(
            email=models.PropertyScalarWhereInputAddress(email),
            AND=None,
            NOT=None,
            OR=None,
        )
        user = api.user_api.find_user(filter=filter).data[0]
        hashed = user.password.encode("utf-8")
        is_valid_auth = hashed == bcrypt.hashpw(bytes(password, "utf-8"), hashed)
    except:
        user = None
        is_valid_auth = False

    if not (user and is_valid_auth):
        return templates.TemplateResponse("login.html", {"isInvalidLogin": True})

    response = RedirectResponse("/properties", status_code=status.HTTP_303_SEE_OTHER)
    response.set_cookie(
        key="session",
        value=user_to_jwt(user),
        secure=True,
        httponly=True,
        samesite="strict",
    )
    return response


@app.get("/logout", response_class=HTMLResponse)
async def logout():
    response = RedirectResponse("/", status_code=status.HTTP_303_SEE_OTHER)
    response.delete_cookie(
        key="session",
        secure=True,
        httponly=True,
        samesite="strict",
    )

    return response


@app.get("/properties", response_class=HTMLResponse)
async def properties_list(
    request: Request,
    user: Annotated[models.User, Depends(user_from_cookie)],
    api: Annotated[Api, Depends(API_CLIENT)],
    skip: int = Query(default=0),
    take: int = Query(default=20),
):
    try:
        properties = api.property_api.find_property(skip=skip or None, take=take).data
    except Exception as e:
        return response_500(e)

    try:
        select = models.PropertyAggregateInput(
            _count=["id"], _avg=None, _max=None, _min=None, _sum=None
        )
        count = api.property_api.aggregate_by_property(select).data.count
    except Exception as e:
        return response_500(e)

    return templates.TemplateResponse(
        "properties.html",
        {
            "request": request,
            "user": user,
            "properties": properties,
            "pagination": pagination(
                skip, take, len(properties), count.id if count and count.id else 0
            ),
        },
    )


@app.get("/properties/new", response_class=HTMLResponse)
async def create_property_form(
    request: Request,
    user: Annotated[models.User, Depends(user_from_cookie)],
):
    if not user:
        raise HTTPException(
            status_code=status.HTTP_307_TEMPORARY_REDIRECT,
            headers={"Location": "/login"},
        )

    return templates.TemplateResponse(
        "property-form.html",
        {
            "user": user,
            "request": request,
            "property_types": models.PropertyType,
            "features": models.Feature,
        },
    )


@app.post("/properties/new", response_class=HTMLResponse)
async def create_property(
    user: Annotated[models.User, Depends(user_from_cookie)],
    api: Annotated[Api, Depends(API_CLIENT)],
    name: Annotated[str, Form()],
    type: Annotated[models.PropertyType, Form()],
    description: Annotated[str, Form()],
    address: Annotated[str, Form()],
    price_per_night: Annotated[int, Form()],
    n_rooms: Annotated[int, Form()],
    n_bathrooms: Annotated[int, Form()],
    n_beds: Annotated[int, Form()],
    features: Annotated[List[models.Feature], Form()],
):
    if not user:
        raise HTTPException(
            status_code=status.HTTP_307_TEMPORARY_REDIRECT,
            headers={"Location": "/login"},
        )

    payload = models.PropertyCreateInput(
        address=address,
        name=name,
        description=description,
        features=models.PropertyCreateInputFeatures(features),
        n_bathrooms=n_bathrooms,
        n_beds=n_beds,
        n_rooms=n_rooms,
        price_per_night=price_per_night,
        type=type,
        user=models.UserCreateNestedOneWithoutPropertiesInput(
            connect=models.UserWhereUniqueInput(id=user.id),
            create=None,
            connectOrCreate=None,
        ),
    )

    try:
        property = api.property_api.create_one_property(payload).data
    except Exception as e:
        return response_500(e)

    return RedirectResponse(
        f"/properties/{property.id}", status_code=status.HTTP_303_SEE_OTHER
    )


@app.get("/properties/{property_id}", response_class=HTMLResponse)
async def property_details(
    property_id: str,
    request: Request,
    user: Annotated[models.User, Depends(user_from_cookie)],
    api: Annotated[Api, Depends(API_CLIENT)],
):
    try:
        property = api.property_api.find_property_by_id(id=property_id).data
    except Exception as e:
        return response_500(e)

    # Figure out why this is None
    if not property.features:
        property.features = []

    return templates.TemplateResponse(
        "property.html",
        {
            "request": request,
            "user": user,
            "property": property,
        },
    )


def pagination(skip: int, take: int, current: int, total: StrictInt | int):
    next = None
    prev = None

    if skip > 0:
        new_skip = 0 if skip - take < 0 else skip - take
        prev = f"skip={new_skip}&take={take}"

    if skip + take < total:
        new_skip = skip + take
        next = f"skip={new_skip}&take={take}"

    return {
        "total": total,
        "start": skip + 1,
        "end": skip + current,
        "next": next,
        "prev": prev,
    }


def response_500(exception: Exception):
    return RedirectResponse("/500", status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
