import React, {FormEvent, FunctionComponent, useContext, useEffect, useReducer} from 'react';
import Input from "../forms/Input";
import Button from "../forms/Button";
import {AuthContext} from "../App";

interface OwnProps {}

type Props = OwnProps;

type loginQuery = {
    email: string,
    password: string
}

const FormLogin: FunctionComponent<Props> = (props) => {
    const auth = useContext(AuthContext);

    const [ data, setData ] = useReducer((state: loginQuery, action: { [key in keyof loginQuery]?: string }) => {
        return { ...state, ...action }
    }, {email: "", password: ""})

    const setInput = (key: keyof loginQuery, value: string) => setData({[key]: value})

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        auth.login(data.email, data.password)
            .then(() => {
                location.assign('/')
            })
    }

    const { error: errorRes } = auth.loginResponse
    const error: () => Nullable<APIError> = () => errorRes?.response?.data

    return (<>
    <form className="formLogin" onSubmit={onSubmit}>
        <p className="text-4xl font-sans text-center form-text">Login</p>

        {
            [
                { placeholder: "Email...", value: "email" as keyof loginQuery, type: 'email' },
                { placeholder: "Password...", value: 'password' as keyof loginQuery, type: 'password' }
            ].map(input => <Input
                className="w-full"
                placeholder={input.placeholder} type={input.type} value={data[input.value]} key={input.value}
                onChange={(e) => setInput(input.value, e.target.value)}
                error={(error()?.errors ?? {})[input.value]}
            />)
        }

        <div className="text-right relative">
            <a href='' className='absolute left-0 bottom-1'>Reset password</a>
            <Button text="Login" type='submit' />
        </div>

        { error()?.message && (!error()?.errors) ?
            <div className="mt-4">
                <p className="text-form-err-500">{error()?.message}</p>
            </div>
        : ''}
    </form>
    </>);
};

export default FormLogin;
