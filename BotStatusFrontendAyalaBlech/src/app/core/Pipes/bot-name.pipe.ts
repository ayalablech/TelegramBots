import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'botName'
})
export class BotNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case "Ayala1Bot":
        return "Bot1";
      case "Ayala2Bot":
        return "Bot2";
      case "Ayala3Bot":
        return "Bot3";
      default:
        return null;
    }
    return null;
  }

}
