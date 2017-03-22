import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { OtherWorksPondSuffix } from './other-works-pond-suffix.model';
import { OtherWorksPondSuffixService } from './other-works-pond-suffix.service';
@Injectable()
export class OtherWorksPondSuffixPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private otherWorksService: OtherWorksPondSuffixService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.otherWorksService.find(id).subscribe(otherWorks => {
                if (otherWorks.date) {
                    otherWorks.date = {
                        year: otherWorks.date.getFullYear(),
                        month: otherWorks.date.getMonth() + 1,
                        day: otherWorks.date.getDate()
                    };
                }
                this.otherWorksModalRef(component, otherWorks);
            });
        } else {
            return this.otherWorksModalRef(component, new OtherWorksPondSuffix());
        }
    }

    otherWorksModalRef(component: Component, otherWorks: OtherWorksPondSuffix): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.otherWorks = otherWorks;
        modalRef.result.then(result => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
