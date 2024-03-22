from neurelo.configuration import Configuration
from neurelo.api_client import ApiClient
from neurelo.api.user_api import UserApi
from neurelo.api.property_api import PropertyApi
from neurelo.api.booking_api import BookingApi

from neurelo import models

class Api:
  def __init__(self, host: str, token: str) -> None:
    configuration = Configuration(host=host, api_key={'ApiKey': token})

    self.api_client = ApiClient(configuration=configuration)
    self.user_api = UserApi(self.api_client)
    self.property_api = PropertyApi(self.api_client)
    self.booking_api = BookingApi(self.api_client)

  def __call__(self) -> "Api":
    return self
