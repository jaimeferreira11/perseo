import { Pipe, PipeTransform  } from '@angular/core';
import { environment } from '../../environments/environment';


@Pipe({
  name: 'doc'
})
export class DocPipe implements PipeTransform {

  transform(path: string, metodo: string = 'private' ): any {


    let url = environment.API + '/' + metodo + '/document';


    if ( !path ) {

      return url + '/commons/no-img.jpg';
    }

    if (typeof path === 'undefined') {

      return url + '/commons/no-img.jpg';
    }

    if ( path.indexOf('http') >= 0 ) {
        return path;
    }

    console.log(url  + '/' + path);
    return url  + '/' + path;
  }

}
