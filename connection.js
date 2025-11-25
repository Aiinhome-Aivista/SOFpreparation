const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://122.163.121.176:3019/';

export const GET_APIS = {};

export const POST_APIS = {
  register: `${BASE_URL}ParentsMicroservices/register`,
  login: `${BASE_URL}AuthMicroservices/login`,
  addChild: `${BASE_URL}ParentsMicroservices/add_child`,
  testresult: `${BASE_URL}ChildMicroservices/test_result`,
  childdetails: `${BASE_URL}ParentsMicroservices/get_child_details`,
};