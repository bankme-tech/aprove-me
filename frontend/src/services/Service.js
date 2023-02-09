import api from "./api";

export default class Service{
    static getList(url) {
        return api.get(url);
    }
    static create(body) {
        return api.post( '/create', body);
    }
    static addGif(id, body) {
        return api.post( `/${id}/gif`, body);
    }
    static deleteGif(id, idGif) {
        return api.delete( `/${id}/gif/${idGif}`);
    }
    static update(id, body) {
        return api.put( `/${id}`, body);
    }
    static delete(id) {
        return api.delete( `/${id}`);
    }
}