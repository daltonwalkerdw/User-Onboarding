import React, { useState, useEffect } from "react"

import axios from "axios"
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup"

const UserForm = ({ values, touched, errors, status }) => {
 const [users, setUsers] = useState([]);

useEffect(() => {
    if(status){
        setUsers([...users, status])

    } 
} ,[status])

    return (
        <div>
            <Form>
                <Field
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={values.name}
                />
                {touched.name && errors.name && <p>{errors.name}</p>}
                <Field
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={values.email}
                />
                {touched.email && errors.email && <p>{errors.email}</p>}
                <Field
                    type="text"
                    name="password"
                    placeholder="Password"
                    value={values.password}
                />
                {touched.password && errors.password && <p>{errors.password}</p>}
                <Field
                    type="checkbox"
                    name="check"
                    value={values.checkbox}
                />
                <button type="submit">Submit</button>

            </Form>
            {users.map(user => (<ul>
            <li>{user.name}</li>
            <li>{user.email}</li>
            <li>{user.password}</li>
            </ul>))}
        </div>
    )
}

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, check }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            check: check || ""
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required("What is your name?"),
        email: Yup.string().required("Email required"),
        check: Yup.boolean(),
        password: Yup.string().required("Password required")
    }),


    handleSubmit(values,{setStatus} ) {
        axios
            .post("https://reqres.in/api/users/", values)
            .then(res => {
                console.log(res);
                setStatus(res.data);

            })
            .catch(err => {
                console.log(err);
            });
    }
})(UserForm);


export default FormikUserForm