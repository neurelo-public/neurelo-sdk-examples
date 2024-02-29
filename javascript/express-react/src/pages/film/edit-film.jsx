import { Button, Card, FormField, LoadingSpinner, toast } from "@components/ui";
import { formatDate, formatTimeShort } from "@lib/utils";
import { ArrowLeftCircleIcon, SaveIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

async function updateFilm(filmData) {
  const res = await fetch(`/api/film/${filmData.film_id}`, {
    method: "PUT",
    body: JSON.stringify(filmData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return {
    data: data || undefined,
    status: res.status,
  };
}

async function getFilm(filmId) {
  const res = await fetch(`/api/film/${filmId}`);
  const data = await res.json();
  return {
    data: data || undefined,
    status: res.status,
  };
}

export function EditFilmPage() {
  const { filmId } = useParams();

  const [filmData, setFilmData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchFilm = useCallback(
    async function () {
      try {
        setIsLoading(true);

        const { data, status } = await getFilm(filmId);
        if (status === 200 && data?.data) {
          setFilmData(data?.data);
        } else {
          toast.error(data?.message);
        }
      } catch (error) {
        console.error("Error fetching film : ", error);
        toast.error(error?.message);
      } finally {
        setIsLoading(false);
      }
    },
    [filmId]
  );

  useEffect(() => {
    fetchFilm();
  }, [fetchFilm]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    if (!filmData.film_id) return;

    const formData = new FormData(event.currentTarget);
    const jsonData = Object.fromEntries(formData.entries());

    try {
      const { data, status } = await updateFilm({
        ...filmData,
        ...jsonData,
      });
      if (status === 200 && data?.data) {
        setFilmData(data?.data);
        // toast.success(`Film id ${filmData?.film_id} updated successfully`);
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error("Error saving data : ", error);
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div size="full">
      <h1 className="text-lg font-medium my-4">
        Edit Film Id: {filmData?.film_id || "--"}
      </h1>

      <Card size="full">
        {!isLoading ? (
          <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
            <FormField
              label="Title"
              inputProps={{
                defaultValue: filmData?.title || "",
                type: "text",
                placeholder: "Title",
                id: "title",
                name: "title",
                className: "w-full p-2 text-zinc-900 bg-zinc-100",
              }}
              errors={null}
            />

            <FormField
              label="Description"
              inputProps={{
                defaultValue: filmData?.description || "",
                type: "text",
                placeholder: "Description",
                id: "description",
                name: "description",
                className: "w-full p-2 text-zinc-900 bg-zinc-100",
              }}
              errors={null}
            />

            <FormField
              label="Rental Rate"
              inputProps={{
                defaultValue: filmData?.rental_rate || "",
                type: "number",
                step: "0.01",
                max: "99.99",
                min: "0.00",
                placeholder: "0.00",
                id: "rental_rate",
                name: "rental_rate",
                className: "w-full p-2 text-zinc-900 bg-zinc-100",
              }}
              errors={null}
            />

            <div className="w-full flex flex-nowrap items-center justify-between">
              <p className="text-sm text-zinc-400 font-normal gap-2 flex items-center">
                Updated at :
                <span className="text-sky-500">
                  {filmData?.last_update
                    ? formatDate(filmData.last_update)
                    : "--- --, ----"}
                </span>
                -
                <span className="text-sky-600">
                  {filmData?.last_update
                    ? formatTimeShort(filmData.last_update)
                    : "--"}
                </span>
              </p>

              <div className="flex items-center justify-end gap-3 mt-6">
                <Link to={-1} className="p-0 m-0" tabIndex={-1}>
                  <Button
                    type="button"
                    startIcon={ArrowLeftCircleIcon}
                    tabIndex={-1}
                  >
                    Go Back
                  </Button>
                </Link>
                <Button type="submit" startIcon={SaveIcon} theme="primary">
                  Save
                </Button>
              </div>
            </div>
          </form>
        ) : (
          <LoadingSpinner />
        )}
      </Card>
    </div>
  );
}
