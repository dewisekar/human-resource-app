import React, { useState, useEffect } from 'react';
import {
  Label, Input, Button, HelperText,
} from '@windmill/react-ui';
import { useHistory } from 'react-router-dom';

import Images from '../../assets/images';
import constants from '../../constants';
import handlers from './Login.handlers';
import AlertModal from '../../components/AlertModal/AlertModal';
import utils from '../../utils';

const { AlertMessage, PATH } = constants;
const { isLoggedIn, clearAllKey } = utils;

const Login = () => {
  const history = useHistory();
  const [state, setState] = useState({});
  const [isFormChecked, setIsFormChecked] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);
  const [modalErrorMessage, setModalErrorMessage] = useState(null);
  const formFields = ['username', 'password'];

  const handleCloseModal = () => setIsModalShown(false);
  const handleShowModal = () => setIsModalShown(true);

  useEffect(() => {
    try {
      const runApp = async () => {
        const isLogged = isLoggedIn();

        if (!isLogged) {
          clearAllKey();
          return;
        }

        history.replace(PATH.Dashboard);
      };

      runApp();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const onFormChange = (event) => {
    const {
      name, value, checked, type,
    } = event.target;
    const newVal = type === 'checkbox' ? checked : value;

    setState({ ...state, [name]: newVal });
  };

  const checkAllFieldsFilled = (fields) => {
    const result = fields.filter((field) => !state[field]);
    return result;
  };

  const handleSubmit = async () => {
    const emptyFields = checkAllFieldsFilled(formFields);
    setIsFormChecked(true);
    const handler = { handleShowModal, setModalErrorMessage, history };

    if (emptyFields.length === 0) {
      await handlers.loginHandler(state, handler);
    }
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      {isModalShown && <AlertModal message={modalErrorMessage} onClose={handleCloseModal}/>}
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2 align-items-center" style={{ display: 'flex' }}>
            <img
              aria-hidden="true"
              className="object-cover w-50 m-auto"
              src={Images.JIERA_LOGO}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
              <Label>
                <span>Username</span>
                <Input className="mt-1" type="text" placeholder="Username" name="username" onChange={onFormChange}/>
                {!state.username && isFormChecked
                && <HelperText valid={false}>{AlertMessage.EMPTY_FORM}</HelperText>}
              </Label>

              <Label className="mt-4">
                <span>Password</span>
                <Input className="mt-1" type="password" placeholder="Password" name="password" onChange={onFormChange} />
                {!state.password && isFormChecked
                && <HelperText valid={false}>{AlertMessage.EMPTY_FORM}</HelperText>}
              </Label>

              <Button className="mt-4" onClick={handleSubmit}>
                Log in
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Login;
