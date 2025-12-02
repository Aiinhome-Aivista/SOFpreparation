const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://122.163.121.176:3019/';

export const GET_APIS = {
  subjectsdataurl: `${BASE_URL}CommonFeatuersMicroservices/subjects`,
  child_performance_track: `${BASE_URL}ParentsMicroservices/performance_monitor`,
  aiinsightsurl: `${BASE_URL}ChildMicroservices/ai_insights`,
  selfpracticedashboardurl: `${BASE_URL}ChildMicroservices/self_practice_dashboard`,
  adminstudentdashboardurl: `${BASE_URL}AdminMicroservices/admin_students_dashboard`,
  adminparentdashboardurl: `${BASE_URL}AdminMicroservices/admin_parents_dashboard`
};

export const POST_APIS = {
  register: `${BASE_URL}ParentsMicroservices/register`,
  login: `${BASE_URL}AuthMicroservices/login`,
  addChild: `${BASE_URL}ParentsMicroservices/add_child`,
  testresult: `${BASE_URL}ChildMicroservices/test_result`,
  childdetails: `${BASE_URL}ParentsMicroservices/get_child_details`,
  generatetest: `${BASE_URL}ChildMicroservices/generate_test`,
  assigntest: `${BASE_URL}ParentsMicroservices/assign_test`,
  updatechilddetails: `${BASE_URL}ParentsMicroservices/update_child_details`,
  startassessment: `${BASE_URL}AssessmentMicroservices/start_assessment`,
  saveanswer: `${BASE_URL}AssessmentMicroservices/save_answer`,
  submitassessment: `${BASE_URL}AssessmentMicroservices/submit`,
  smartassistantchat: `${BASE_URL}ParentsMicroservices/smart_assistant`,
  adminaddparent: `${BASE_URL}AdminMicroservices/admin_add_parent`,
};

export const DELETE_APIS = {
  deletechild: `${BASE_URL}ParentsMicroservices/delete_child`,
};