import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { SkillProfile } from '../_models';

const baseUrl = `${environment.apiUrl}`+`${environment.searchUrl}`  ;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  getByCriteria(criteria: string, criteriaValue : string) {
    console.log(baseUrl);
        return this.http.post<SkillProfile[]>(`${baseUrl}/${criteria}/${criteriaValue}`, '');
    }
}
