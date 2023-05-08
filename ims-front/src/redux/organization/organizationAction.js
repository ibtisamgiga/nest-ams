import {
  GET_ORGANIZATIONS_REQUEST,
  GET_ORGANIZATIONS_FAILURE,
  GET_ORGANIZATION_REQUEST,
  GET_ORGANIZATIONS_SUCCESS,
  GET_ORGANIZATION_FAILURE,
  GET_ORGANIZATION_SUCCESS,
  UPDATE_ORGANIZATION,
  UPDATE_ORGANIZATION_SUCCESS,
  UPDATE_ORGANIZATION_ERROR,
  DELETE_ORGANIZATION,
  DELETE_ORGANIZATION_ERROR,
  DELETE_ORGANIZATION_SUCCESS,
  CREATE_ORGANIZATION,
CREATE_ORGANIZATION_SUCCESS,
CREATE_ORGANIZATION_ERROR,
GET_ORGANIZATIONS_COUNT_SUCCESS,
GET_ORGANIZATIONS_COUNT_FAILURE,
GET_ORGANIZATIONS_COUNT,
GET_ORGANIZATIONS_SEARCH
} from "../constants";
// export const fetchOrgaizationList = () => {
//   return {
//     type: ORGANIZATION_LIST,
//   };
// };

export const getOrganizationsRequest = () => ({
  type: GET_ORGANIZATIONS_REQUEST,
});

export const getOrganizationsSuccess = (organizations) => ({
  type: GET_ORGANIZATIONS_SUCCESS,
  payload: { organizations },
});

export const getOrganizationsFailure = (error) => ({
  type: GET_ORGANIZATIONS_FAILURE,
  payload: { error },
});

export const getOrganizationRequest = (id) => ({
  type: GET_ORGANIZATION_REQUEST,
  payload: { id },
});

export const getOrganizationSuccess = (organization) => ({
  type: GET_ORGANIZATION_SUCCESS,
  payload: { organization },
});

export const getOrganizationFailure = (error) => ({
  type: GET_ORGANIZATION_FAILURE,
  payload: { error },
});


export const updateOrganization = (organization,id) => ({
  type: UPDATE_ORGANIZATION,
  payload: { body:organization ,id},
});

export const updateOrganizationSuccess = (organization) => ({
  type: UPDATE_ORGANIZATION_SUCCESS,
  payload: { organization },
});

export const updateOrganizationError = (error) => ({
  type: UPDATE_ORGANIZATION_ERROR,
  payload: { error },
});

export const deleteOrganization = (id) => ({
  type: DELETE_ORGANIZATION,
  payload: { id },
});

export const deleteOrganizationSuccess = (id) => ({
  type: DELETE_ORGANIZATION_SUCCESS,
  payload: { id },
});

export const deleteOrganizationError = (error) => ({
  type: DELETE_ORGANIZATION_ERROR,
  payload: { error },
});

export const createOrganization = (organization) => ({
  type: CREATE_ORGANIZATION,
  payload: {body: organization },
});

export const createOrganizationSuccess = (organization) => ({
  type: CREATE_ORGANIZATION_SUCCESS,
  payload: { body:organization },
});

// export const createOrganizationError = (error) => ({
//   type: CREATE_ORGANIZATION_ERROR,
//   payload: {error },
// });


export const getOrganizationsCount = () => ({
  type: GET_ORGANIZATIONS_COUNT,
});

export const getOrganizationsCountSuccess = (count) => (
  
  {
 
  type: GET_ORGANIZATIONS_COUNT_SUCCESS,
  payload: { count },
});

export const getOrganizationsCountFailure = (error) => ({
  type: GET_ORGANIZATIONS_COUNT_FAILURE,
  payload: { error },
});
