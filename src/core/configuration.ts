import { environment } from './../environments/environment';

export const Configuration = {
  ApiUrl: environment.ApiUrl,
  dateFormat: 'MMM d, yyyy, HH:mm',
  ImageProcessorUrl: environment.ImageProcessorUrl,
  NeshanWebMapApiToken: environment.NeshanWebMapApiToken,
};
