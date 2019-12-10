import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCase'
})
export class CamelCasePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let values = value.split(' ')
    let result = ''

    for(let v of values){
      result += v.lenght < 3 ? (v + ' ' ) : (v.substr(0,1).toUpperCase() + v.substr(1).toLowerCase() + ' ');
    }
    return result;
  }
}
