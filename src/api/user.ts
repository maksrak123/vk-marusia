import { validateResponse } from "./validateResponce";
import { API_URL } from "./url";
import { LogoutSchema, Logout, User, UserSchema } from "./types";

export function registerUser(email: string, name: string, surname: string, password: string ): Promise<void> {
    return fetch(`${API_URL}/user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, surname, password}),
        credentials: "include",
    })
    .then(validateResponse)
    .then(() => undefined);
}

export function loginUser(email: string, password: string): Promise<void> {
    return fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password}),
        credentials: 'include',
    })
    .then(validateResponse)
    .then(() => undefined)
}

export function stopAutorization(): Promise<Logout> {
    return fetch(`${API_URL}/auth/logout`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
    })
    .then(validateResponse)
    .then(responce => responce.json())
    .then((data) => LogoutSchema.parse(data));
}

export function fetchMe(): Promise<User> {
    return fetch(`${API_URL}/profile`, {
        credentials: 'include',
    })
    .then(validateResponse)
    .then(responce => responce.json())
    .then((data) => UserSchema.parse(data))
}