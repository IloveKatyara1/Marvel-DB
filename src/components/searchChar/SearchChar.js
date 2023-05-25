import { Formik, Form, Field, ErrorMessage } from 'formik';
import useMarvelServices from '../../services/MarvelServices';

import './searchChar.scss';

const SearchChar = () => {
    const { getCharByName } = useMarvelServices;

    return (
        <div className="search-char">
            <Formik
                initialValues={{ name: '' }}
                validate={(values) => {
                    const errors = {};
                    if (!values.name) {
                        errors.email = 'add name character';
                    }

                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => console.log(values, 'values', setSubmitting, 'setSubmitting')}>
                {({ isSubmitting }) => (
                    <Form>
                        <label htmlFor="name" className="search-char__label">
                            Or find a character by name:
                        </label>
                        <Field className="search-char__input" name="nameCharacther" placeholder="Enter name" />
                        <ErrorMessage name="nameCharacther" component="div" />
                        <button type="submit" className="button button__main" disabled={isSubmitting}>
                            <div className="inner">Find</div>
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SearchChar;
