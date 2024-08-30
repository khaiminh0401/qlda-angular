import { Injectable } from '@angular/core';
import { AppConst } from '../app.const';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  onLoad = (status : boolean) : void => {
    console.log("loaded")
    status = true;
    console.log(status);
  }
  onError = (event : Event) : void => {
    console.log("error");
    (event.target as HTMLImageElement).src = AppConst.DEFAULT_IMAGE;
  }
}
