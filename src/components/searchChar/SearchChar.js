import { useState, useContext } from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import useMarvelServices from '../../services/MarvelServices';

import { singleChar } from '../app/App';

import './searchChar.scss';
import { Link } from 'react-router-dom';

const SearchChar = () => {
    const { getCharByName } = useMarvelServices();

    const [message, setMessage] = useState({});

    const { setDataSingleChar } = useContext(singleChar);

    return (
        <div className="search-char">
            <Formik
                initialValues={{ nameCharacther: '' }}
                validate={(values) => {
                    const errors = {};
                    if (!values.nameCharacther) {
                        errors.nameCharacther = 'add name character';
                    }

                    return errors;
                }}
                onSubmit={async ({ nameCharacther }) => {
                    message.isChanged = false;
                    await getCharByName(nameCharacther)
                        .then((data) => setMessage({ ...data, ...{ error: false } }))
                        .catch((e) => setMessage({ report: e.report, error: true }));
                }}>
                {({ isSubmitting }) => (
                    <Form>
                        <label htmlFor="nameCharacther" className="search-char__label">
                            Or find a character by name:
                        </label>
                        <div style={{ width: 'calc(100% - 101px)' }}>
                            <Field
                                className="search-char__input"
                                name="nameCharacther"
                                placeholder="Enter name"
                                onInput={() => (message.isChanged = true)}
                            />
                            <ErrorMessage name="nameCharacther" className="message message-error" component="div" />
                            <div
                                className={`message ${
                                    isSubmitting ? null : message.error ? 'message-error' : 'message-successful'
                                }`}>
                                {!message.isChanged ? (!isSubmitting ? message.report : 'Loading...') : null}
                            </div>
                        </div>
                        <div className="search-char_btn-group">
                            <button type="submit" className="button button__main" disabled={isSubmitting}>
                                <div className="inner">Find</div>
                            </button>
                            {message.error === false && !message.isChanged && (
                                <Link to={`charther/${message.name}`}>
                                    <button
                                        onClick={() =>
                                            setDataSingleChar({
                                                ...message,
                                                ...{ isFromSearch: true },
                                            })
                                        }
                                        className="button button__secondary">
                                        <div className="inner">To page</div>
                                    </button>
                                </Link>
                            )}
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SearchChar;
