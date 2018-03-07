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
	@Output() parentAttr = new EventEmitter<Boolean>();
	constructor(private http: HttpService, private common: CommonService) { }

	ngOnInit() {
        if(this.currentDataset){
            this.Dataset = this.currentDataset;  
        }
		
		this.http.get(this.api).then((configRes) => {
			this.colsConfig = configRes['cols'].split(',');
			this.colsAttributes = configRes['colsAttributes'] || {};

            //添加接口
            this.addApi = configRes['api'] || configRes['redactApi'];
            console.log(configRes)

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
                }
            }else{
                alert('填完信息');
            }
            
        })

    }
}
