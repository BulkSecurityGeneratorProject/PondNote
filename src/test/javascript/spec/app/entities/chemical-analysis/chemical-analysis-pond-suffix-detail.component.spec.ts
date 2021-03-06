import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils } from 'ng-jhipster';
import { JhiLanguageService } from 'ng-jhipster';
import { MockLanguageService } from '../../../helpers/mock-language.service';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ChemicalAnalysisPondSuffixDetailComponent } from '../../../../../../main/webapp/app/entities/chemical-analysis/chemical-analysis-pond-suffix-detail.component';
import { ChemicalAnalysisPondSuffixService } from '../../../../../../main/webapp/app/entities/chemical-analysis/chemical-analysis-pond-suffix.service';
import { ChemicalAnalysisPondSuffix } from '../../../../../../main/webapp/app/entities/chemical-analysis/chemical-analysis-pond-suffix.model';

describe('Component Tests', () => {

    describe('ChemicalAnalysisPondSuffix Management Detail Component', () => {
        let comp: ChemicalAnalysisPondSuffixDetailComponent;
        let fixture: ComponentFixture<ChemicalAnalysisPondSuffixDetailComponent>;
        let service: ChemicalAnalysisPondSuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [ChemicalAnalysisPondSuffixDetailComponent],
                providers: [
                    MockBackend,
                    BaseRequestOptions,
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    {
                        provide: Http,
                        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                            return new Http(backendInstance, defaultOptions);
                        },
                        deps: [MockBackend, BaseRequestOptions]
                    },
                    {
                        provide: JhiLanguageService,
                        useClass: MockLanguageService
                    },
                    ChemicalAnalysisPondSuffixService
                ]
            }).overrideComponent(ChemicalAnalysisPondSuffixDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChemicalAnalysisPondSuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChemicalAnalysisPondSuffixService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ChemicalAnalysisPondSuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.chemicalAnalysis).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
