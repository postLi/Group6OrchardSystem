import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import {HttpService} from '../../utils/http.service'
import {CommonService}  from '../../utils/common.service'
// import {
// 	FormBuilder,
// 	FormGroup,
// 	FormControl
// } from '@angular/forms';
@Component({
	selector: 'dataform',
	templateUrl: './dataform.component.html',
	styleUrls: ['./dataform.component.scss']
})
export class DataformComponent implements OnInit {
	@Input() api: string;
	@Input() currentDataset:Array<any>;
	@Input() redact: boolean;
    @Input() id:number;
	colsConfig: Array<any> = [];
	privateDic: Object = {};
	colsAttributes: Object = {};
	selectApiDataSet: Object = {};
	obj:Object={};
	redactShow:boolean;
	Dataset:Object={};
    addApi:string;
    searchApi:String;
    seach:boolean = false;
	@Output() parentAttr = new EventEmitter<Boolean>();
    @Output() searchAttr = new EventEmitter<any>();
	constructor(private http: HttpService, private common: CommonService) { }
    dismissible = true;
      alerts: any = [
        {
          type: 'success',
          msg: `加入成功`
        },
        {
          type: 'danger',
          msg: `失败`
        }
      ];
 
	ngOnInit() {
        if(this.currentDataset){
            this.Dataset = this.currentDataset;  
        }
		
		this.http.get(this.api).then((configRes) => {
			this.colsConfig = configRes['cols'].split(',');
			this.colsAttributes = configRes['colsAttributes'] || {};

            console.log(this.api)

            //添加接口
            this.addApi = configRes['api'] || configRes['redactApi'];
            console.log(configRes['searchApi'])
            if(configRes['searchApi']){
                this.searchApi = configRes['searchApi'];
                this.seach = true;
            }

			for(let item in this.colsAttributes){
				if(this.colsAttributes[item]['type'] == 'select-api'){	
					let _api = this.colsAttributes[item]['api'];
					this.http.get(_api).then((res) => {
						this.selectApiDataSet[item] = res['data'];
					})
				}
			}
		})
	}
	quxiao(){
		this.redactShow = false;
        this.parentAttr.emit(this.redactShow);
    }
    queding(){
        this.redactShow = false;
        this.parentAttr.emit(this.redactShow);
        let params = {};
        for(var attr in this.Dataset){
            params[attr] = this.Dataset[attr];
        }
        
        this.http.post(this.addApi,params).then((res) => {
            console.log(res)
            if(res['status']){
                if(this.addApi=='addgoods'){
                    alert('添加成功');
                    this.Dataset = {};
                }else if(this.addApi =='updatagoods'){
                     alert('修改成功');
                }else{
                   alert('成功'); 
                }
            }else{
                alert('填完信息');
            }
            
        })
    }
    search(){
        let params = {};
        for(var attr in this.Dataset){
            params[attr] = this.Dataset[attr];
        }
        this.searchAttr.emit({searchApi:this.searchApi,params:params});
        // this.http.get(this.searchApi,params).then((res) => {
        //     console.log(this.searchAttr)
        //     this.searchAttr.emit(res);
               
        // })

    }
    none(){
        console.log(this)
    }
}
