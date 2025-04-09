// signup component similar to login page (except loginWithPassword)
// instead createUser to insert a new user account document

// login page overrides the form’s submit event and call Meteor’s loginWithPassword()
// Authentication errors modify the component’s state to be displayed
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userprofileApi } from '../../../modules/userprofile/api/userProfileApi';

import SignUpStyles from './signUpStyle';
import Box from '@mui/material/Box';
import AppLayoutContext, { IAppLayoutContext } from '/imports/app/appLayoutProvider/appLayoutContext';
import AuthContext, { IAuthContext } from '/imports/app/authProvider/authContext';
import Typography from '@mui/material/Typography';
import signUpSchema from './signUpSch';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import SysFormButton from '/imports/ui/components/sysFormFields/sysFormButton/sysFormButton';
import SysForm from '/imports/ui/components/sysForm/sysForm';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';


export const SignUp: React.FC = () => {
	const { signIn } = useContext<IAuthContext>(AuthContext);
	const { showNotification } = useContext<IAppLayoutContext>(AppLayoutContext);
	const { Container, Content, FormContainer, FormWrapper } = SignUpStyles;
	const navigate = useNavigate();

	const handleSubmit = (doc: { email: string; password: string }) => {
		const { email, password } = doc;

		userprofileApi.insertNewUser({ email, username: email, password }, (err) => {
			if (err) {
				showNotification({
					type: 'warning',
					title: 'Erro no cadastro!',
					message: 'Não foi possível cadastrar o usuário!'
				});
			} else {
				signIn(email, password, (e) => {
					showNotification({
						type: 'success',
						title: 'Cadastro realizado!',
						message: 'O usuário foi registrado!'
					});
					navigate('/');
				});
			}
		});
	};

	return (
		<Container>
			<Content>
				<Typography variant="h2" display={'inline-flex'} gap={1}>
					<Typography variant="inherit" color="sysText.tertiary">
						{'{'}
					</Typography>
					ToDo List
					<Typography variant="inherit" color="sysText.tertiary">
						{'}'}
					</Typography>
				</Typography>
				<FormContainer>
					<Typography variant="h5">Cadastre-se no sistema</Typography>
					<SysForm schema={signUpSchema} onSubmit={handleSubmit} debugAlerts={false}>
						<FormWrapper>
							<SysTextField name="email" label="Email" fullWidth placeholder="Digite seu email" />
							<SysTextField name="password" label="Senha" fullWidth placeholder="Digite sua senha" type="password" />

							{/* <Box /> */}
							<Typography variant='body2'>
								Já possui uma conta?{" "}
								<Link to='/' color={'secondary'}>
									Entre
								</Link>
							</Typography>

							{/* <Box /> */}
							<SysFormButton variant="contained" color="primary" endIcon={<SysIcon name={'arrowForward'} id="submit" />}>
								Cadastrar
							</SysFormButton>
						</FormWrapper>
					</SysForm>
				</FormContainer>
				<Box component="img" src="/images/wireframe/synergia-logo.svg" sx={{ width: '100%', maxWidth: '400px' }} />
			</Content>
		</Container>
	);
};
