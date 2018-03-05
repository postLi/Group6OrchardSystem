import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lianxi',
  templateUrl: './lianxi.component.html',
  styleUrls: ['./lianxi.component.css']
})
export class LianxiComponent implements OnInit {

    editRow = null;
    tempEditObject = {};
    data = [
        {
          key    : 0,
          name   : 'Edward King 0',
          age    : 32,
          address: 'London, Park Lane no. 0',
        }
    ];
    edit(data) {
        this.tempEditObject[ data.key ] = { ...data };
        this.editRow = data.key;
    }

    save(data) {
        Object.assign(data, this.tempEditObject[ data.key ]);
        this.editRow = null;
    }

    cancel(data) {
        this.tempEditObject[ data.key ] = {};
        this.editRow = null;
    }
    constructor() { }

    ngOnInit() {
        this.data.forEach(item => {
            this.tempEditObject[ item.key ] = {};
            })
    }

}
