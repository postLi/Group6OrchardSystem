import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import { HttpService } from '../../utils/http.service'
import { NzModalService } from 'ng-zorro-antd';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    validateForm: FormGroup;
    constructor(private fb: FormBuilder,private http: HttpService,private confirmServ: NzModalService) {}

    username:String;
    password:String;
    _submitForm() {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[ i ].markAsDirty();
        }
    }

    ngOnInit() {
        this.validateForm = this.fb.group({
            userName: [ null, [ Validators.required ] ],
            password: [ null, [ Validators.required ] ],
            remember: [ true ],
        });

    }
    verify(){
        console.log(66)
        let params = {};

        params['username'] = this.username;
        this.http.get('login',params).then((res)=>{
            console.log(res)
        })
    }
    error() {
        this.confirmServ.error({
          title: '错误',
          content: '输入用户名或密码有误'
        });
    }
    warning() {
        this.confirmServ.warning({
          title: '警告',
          content: '请输入用户名或密码'
        });
    }
    login(){
        let params = {};
        params['username'] = this.username;
        params['password'] = this.password;
        console.log(this.username)
        if(this.username ==undefined||this.password==undefined){
            this.warning();
        }else{
            this.http.get('login',params).then((res)=>{
                let len = res['data'].results.length;
                if(len==0){
                    this.error();
                }else{

                }
            })     
        }
    }

}
