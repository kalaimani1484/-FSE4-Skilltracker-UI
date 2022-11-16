export class SkillProfile {
    name : string;
    associateId : string;
    email : string;
    phone : string;
    modifiedAt : string;
    technicalSkill : SkillDetail[];
    softSkill : SkillDetail[];
    collectionName : string;
    id:string;

}
export class SkillDetail {
    skillName : string;
    expertise : number;
}