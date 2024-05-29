// Added to SDK template
// export const parseSearchParams = (searchParams: URLSearchParams, objects: any[]): void => {
//   objects.forEach((object) => {
//     if (object && Object.keys(object).length > 0) {
//       Object.entries(object).forEach(([key, value]) => {
//         if (value === undefined || value === null) {
//           searchParams.set(key, '');
//         } else {
//           if (typeof value === 'object' || Array.isArray(value)) {
//             searchParams.set(key, JSON.stringify(value));
//             return;
//           }
//           searchParams.set(key, value as string);
//         }
//       });
//     }
//   });
// };

// export const configParameters: ConfigurationParameters = {
//   apiKey: process.env.NEURELO_API_KEY || '',
//   basePath: BASE_PATH,
//   baseOptions: {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   },
// };

// export const config = new Configuration(configParameters);
// const baseApi = new BaseAPI(config, config.basePath, axiosInstance);

// const exportAllServices = <T>(ClassToCall: new (config: Configuration) => T) => {
//   const service = new ClassToCall(config);
//   return service as T;
// };

// export const ActorService = exportAllServices(ActorApi);
// export const FilmService = exportAllServices(FilmApi);
// export const AuthService = exportAllServices(AuthApi);
