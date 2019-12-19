import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroArray'
})
export class FiltroArrayPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    if(value.lenght === 0 || args == undefined){
      return value;
    }

    let filter = args.toString().toLocaleLowerCase();
    return value.filter(
      v => v.toLocaleLowerCase().indexOf(filter) != -1
    )
  }

}
