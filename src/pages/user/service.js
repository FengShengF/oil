import request from '@/utils/request';

export async function getUserList() {
    return request(`/User/list`);
}

export async function updateUserDetail(params) {
    return request(`/User/update`, {
        method: 'PUT',
        data: params,
    });
}

export async function deleteUserServer(params) {
    return request(`/User/delete/${params.id}`, {
        method: 'DELETE',
    });
}

export async function addUserDetail(params) {
    return request(`/user/add`, {
        method: 'POST',
        data: params,
    });
}

export async function getRoleList(params) {
    return request(`/userRole/getRoleList/${params.id}`);
}

export async function addUserRole(params) {
    return request(`/userRole/addList`, {
        method: 'POST',
        data: params,
    });
}

export async function deleteUserRole(params) {
    return request(`/userRole/deleteList`, {
        method: 'DELETE',
        data: params,
    });
}

