import {Component, OnInit, Input} from '@angular/core';
import {Http} from '@angular/http';
import $ from '../../utils/httpclient'
import {Utils} from '../../utils/utils'

import {CommonService} from '../../utils/common.service'

@Component({
    selector: 'datagrid',
    templateUrl: './datagrid.component.html',
    styleUrls: ['./datagrid.component.css']
})

export class DataGridComponent implements OnInit{
    dataset: Array<any> = null;
    columns: Array<string> = null;
    filterColumns: Array<string> = null;
    privateDic: Object; //私有字典
    multiple: boolean;
    currentTrIndexs: Array<number> = [];
    filterDataConfig: Object = {};
    pageCount: number = 0;
    paginationConfig: Object;
    apiConfig: string;
    searchConfig: Object = {};
    rowsCount:number;

    @Input() config: string;

    constructor(private http: Http, private common: CommonService){}

    ngOnInit(){
        //获取当前模块的配置
        $.get(this.http, this.config).then((configRes) => {

            let cols = configRes['cols'];
            this.columns = !cols || cols == '*' ? [] : cols.split(',');

            let filterCols = configRes['filterCols'];
            this.filterColumns = !filterCols ? [] : filterCols.split(',');

            let dic = configRes['dictionary'];
            this.privateDic = dic || {};

            this.multiple = configRes['multiple'];
            console.log(this.multiple,configRes)

            this.filterDataConfig = configRes['filterData'] || {};

            this.paginationConfig = configRes['pagination'] || {};

            this.apiConfig = configRes['api'];
            
            this.searchConfig = configRes['search'] || {};

            this.apiRequest();

        })
    }

    apiRequest(_page = 1){
        let pageParams = {};
        if(this.paginationConfig){
            pageParams['pageitems'] = this.paginationConfig['pageitems'];
            pageParams['page'] = _page;
        }        
        //配置信息中的 api
        $.get(this.http, this.apiConfig, pageParams).then((apiRes) => {
            
            this.dataset = apiRes['data'].results[0];
            this.rowsCount = apiRes['data'].results[1][0].rowscount;
            console.log(apiRes['data'].results[1])
            let pageItems = this.paginationConfig['pageitems'];

            this.pageCount = Math.ceil(this.rowsCount / pageItems);
            console.log(this.pageCount,pageItems)
        })
    }

    getKeys(item){
        return Object.keys(item);
    }

    selectTr(_idx){
        if(this.multiple){
            if(this.currentTrIndexs.indexOf(_idx) > -1){
                this.currentTrIndexs.splice(this.currentTrIndexs.indexOf(_idx), 1);
            } else {
                this.currentTrIndexs.push(_idx);
            }
        } else {
            this.currentTrIndexs = [_idx];
        }
    }

    selectAll(){
        if(this.currentTrIndexs.length != this.dataset.length){
            this.currentTrIndexs = [];
            for(let i = 0; i < this.dataset.length; i++){
                this.currentTrIndexs.push(i);
            }
        } else {
            this.currentTrIndexs = [];
        }
    }

    filterData(_key, _val){
        let _config = this.filterDataConfig[_key];
        if(!_config){
            return _val;
        } else if(_config.type == "DateFormat"){
            return Utils.dateFormat(new Date(_val), _config.format); 
        } else if(_config.type == "Replace"){
            let reg = new RegExp(_config.reg);
            return _val.replace(reg, _config.replaceVal);
        }
    }

    goto(event){
        // console.log(event.target.ant-pagination-item-active)
        // let _page = event.target.innerText;
        var _page;
        // console.log(isNaN(event.target.innerText));
        var len = event.path[2].children;
        for(var i=0;i<len.length;i++){
            // console.log(len[i].className)
            if(len[i].className =='ant-pagination-item ant-pagination-item-active ng-star-inserted'){
                _page = len[i].innerText
            }
        }
        this.apiRequest(_page);

    }
}