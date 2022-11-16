import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { first, filter } from 'rxjs/operators';
import { SearchService, AlertService } from '../_services';
import { KeyValue } from '@angular/common';
import { SkillDetail, SkillProfile } from '../_models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  form: FormGroup;
  loading = false;
  tskvp: any[];
  techskillsData: SkillProfile[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService,
    private alertService: AlertService,
    ) 
    {
    this.form = this.formBuilder.group({
      name: ['',  [Validators.pattern("^[a-zA-Z]{5,30}$")]],
      associateid: ['', [Validators.pattern("^[CTSa-zA-Z0-9]{5,30}$")]],
      techskill: [''],
    });

    // let skillProfile = new SkillProfile();

    // skillProfile.name = "Kalaimani";
    // skillProfile.associateId = "CTS133601";
    // skillProfile.email = "kalaimani.t@CTS.Com";
    // skillProfile.phone = "2356897412";
    // skillProfile.technicalSkill = [];
    // skillProfile.softSkill = [];
    // skillProfile.technicalSkill.push({ skillName : "htmlcssjavascript", expertise: 15 })
    // skillProfile.technicalSkill.push({ skillName : "angular", expertise: 15 })
    // skillProfile.technicalSkill.push({ skillName : "react", expertise: 15 })
    // skillProfile.technicalSkill.push({ skillName : "aspnetcore", expertise: 15 })
    // skillProfile.technicalSkill.push({ skillName : "restful", expertise: 15 })
    // skillProfile.technicalSkill.push({ skillName : "entityframework", expertise: 15 })
    // skillProfile.technicalSkill.push({ skillName : "git", expertise: 15 })
    // skillProfile.technicalSkill.push({ skillName : "docker", expertise: 15 })
    // skillProfile.technicalSkill.push({ skillName : "jenkins", expertise: 15 })
    // skillProfile.technicalSkill.push({ skillName : "azure", expertise: 15 })
    // skillProfile.softSkill.push({ skillName : "spoken", expertise: 15 })
    // skillProfile.softSkill.push({ skillName : "communication", expertise: 15 });
    //this.techskillsData.push(skillProfile);

    this.tskvp = [
      { name: "HTML-CSS-JAVASCRIPT", value: "htmlcssjavascript" },
      { name: "ANGULAR", value: "angular" },
      { name: "REACT", value: "react" },
      { name: "Asp.Net Core", value: "aspnetcore" },
      { name: "RESTFUL", value: "restful" },
      { name: "Entity Framework", value: "entityframework" },
      { name: "GIT", value: "git" },
      { name: "DOCKER", value: "docker" },
      { name: "JENKINS", value: "jenkins" },
      { name: "Azure", value: "azure" }
    ];
  
  }
  ngOnInit() {
  }
  onSubmit() {
    debugger;
    this.alertService.clear();
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    var criteria = '', criteriaValue = '';

    if (this.f.name.value != null && this.f.name.value != "") {
      criteria = 'name';
      criteriaValue = this.f.name.value
    }
    else if (this.f.associateid.value != null && this.f.associateid.value != "") {
      criteria = 'associateid';
      criteriaValue = this.f.associateid.value
    }
    else {
      criteria = 'skills';
      criteriaValue = this.f.techskill.value
    }

    this.searchService.getByCriteria(criteria, criteriaValue)
      .pipe(first())
      .subscribe(
        data => {
          if (data && data.length > 0) {
            this.techskillsData = data;
            this.loading = false;
          }
          else {
            this.alertService.error("Record not found!.");
            this.loading = false;
          }
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });

    this.loading = true;
  }
  get f() { return this.form.controls; }

  populateSkills(skill: KeyValue<string, string>) {
    debugger;
    var s = this.tskvp.filter(s => s.value == skill[0].key);
    return s[0].name + ":" + skill[0].value;
  } 
}
