import FileSaver from 'file-saver';
import { dateFormat } from '@util/DateUtils';


const ReportToCsv = (project,data) => {
  if(data.length >= 1){
    let str = '时间,气,电,单耗\n'
    // 生成内容
    let rowOrder = ['timestamp','气','电','单耗']
    data.map( row =>{
        rowOrder.map( order => {
          let value = row[order]
          if( order ==='timestamp'){
            str += dateFormat("YYYY-mm-dd HH:MM",new Date(Number(row[order])))+',' 
          }else if(order ==='单耗'){
            str += value+'\n'
          }else{
            str += value+','
          }
          return null
        })
      return null
    }) 
    //Excel打开后中文乱码添加如下字符串解决
    let exportContent = "\uFEFF";
    let blob = new Blob([exportContent + str], {
      type: "text/plain;charset=utf-8"
    });
    console.log(data[0]['timestamp'])
    let start = dateFormat("YYYY-mm-dd HH-MM",new Date(Number(data[0]['timestamp'])))
    let end = dateFormat("YYYY-mm-dd HH-MM",new Date(Number(data[data.length - 1]['timestamp'])))
    FileSaver.saveAs(blob, project + '-' + start + '-' + end + ".csv");

  }
}

export { ReportToCsv }