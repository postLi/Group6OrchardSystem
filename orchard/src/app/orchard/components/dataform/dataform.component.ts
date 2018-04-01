import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import {HttpService} from '../../utils/http.service'
import {CommonService}  from '../../utils/common.service'
import global from '../../utils/global'
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
    smallAttributes:Object = {};
	selectApiDataSet: Object = {};
	obj:Object={};
	redactShow:boolean;
	Dataset:Object={};
    addApi:string;
    searchApi:String;
    store:Object = global;
    seach:boolean = false;

    success:boolean = false;
    error:boolean = false;
    warn:boolean = false;
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

            //添加接口
            this.addApi = configRes['api'] || configRes['redactApi'];
           
            if(configRes['searchApi']){
                this.searchApi = configRes['searchApi'];
                this.seach = true;
            }
			for(let item in this.colsAttributes){
				if(this.colsAttributes[item]['type'] == 'select-api'){	
					let _api = this.colsAttributes[item]['api'];
                    let params = {};
                    params['id'] =  this.store['selectValue'];
					this.http.get(_api,params).then((res) => {
     
						this.selectApiDataSet[item] = res['data'].results;
                        console.log(this.selectApiDataSet)
					})
				}else if(this.colsAttributes[item]['type'] == 'select-small-api'){    
                    let _api = this.colsAttributes[item]['api'];
                 
                    this.http.get(_api).then((res) => {
                       
                        this.smallAttributes[item] = res['data'].results;
                        console.log(this.smallAttributes)
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
        params['bigtypeid'] = this.store['selectValue'];
        params['smalltypeid'] = this.store['smallValue'];
       
        this.http.post(this.addApi,params).then((res) => {
            console.log(res)
            if(res['status']){
                if(this.addApi=='addgoods'){     
                    this.success = true; 
                    console.log(this.success)
                    setTimeout(()=>{
                       this.success = false;   
                    }, 1000);
                  
                    this.Dataset = {};
                }else if(this.addApi =='updatagoods'){
                    this.success = true; 
                    setTimeout(()=>{
                       this.success = false;   
                    }, 1000);
                }else if(res['data'].results.length>0){
                    this.error = true; 
                    setTimeout(()=>{
                       this.error = false;   
                    }, 1000);
                }else{
                    this.success = true; 
                    setTimeout(()=>{
                       this.success = false;   
                    }, 1000);
                   this.Dataset = {};
                }
            }else{
                this.warn = true; 
                console.log(this.warn)
                    setTimeout(()=>{
                       this.warn = false;   
                }, 1000);

            }    
        })
    }
    search(){
        let params = {};
        for(var attr in this.Dataset){
            params[attr] = this.Dataset[attr];
        }
        this.searchAttr.emit({searchApi:this.searchApi,params:params});

    }
    none(){
        console.log(this)
        this.success = false;
    }
}
