import React, { useContext, useEffect } from 'react';
import SignInStyles from './signInStyles';
import { Link, useNavigate } from 'react-router-dom';
import SysTextField from '../../../ui/components/sysFormFields/sysTextField/sysTextField';
import SysForm from '../../../ui/components/sysForm/sysForm';
import SysFormButton from '../../../ui/components/sysFormFields/sysFormButton/sysFormButton';
import { signInSchema } from './signinsch';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SysIcon from '../../../ui/components/sysIcon/sysIcon';
import AuthContext, { IAuthContext } from '/imports/app/authProvider/authContext';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';

const SignInPage: React.FC = () => {
	const { showNotification } = useContext(AppLayoutContext);
	const { user, signIn } = useContext<IAuthContext>(AuthContext);
	const navigate = useNavigate();
	const { Container, Content, FormContainer, FormWrapper } = SignInStyles;

	const handleSubmit = ({ email, password }: { email: string; password: string }) => {
		signIn(email, password, (err) => {
			if (!err) navigate('/');
			else {
				showNotification({
					type: 'error',
					title: 'Erro ao tentar logar',
					message: 'Email ou senha inválidos',
				});
			}
		});
		;
	};

	useEffect(() => {
		if (user) navigate('/');
	}, [user]);

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
					<Typography variant="h5">Acesse o sistema</Typography>
					<SysForm schema={signInSchema} onSubmit={handleSubmit} debugAlerts={false}>
						<FormWrapper>
							<SysTextField name="email" label="Email" fullWidth placeholder="Digite seu email" />
							<SysTextField label="Senha" fullWidth name="password" placeholder="Digite sua senha" type="password" />

							{/* <Box /> */}
							<Typography variant='body2'>
								Esqueceu sua senha?{" "}
								<Link to='/password-recovery' color={'secondary'}>
									Clique aqui
								</Link>
							</Typography>

							<Typography variant='body2'>
								Novo por aqui?{" "}
								<Link to='/signup' color={'secondary'}>
									Cadastre-se
								</Link>
							</Typography>


							{/* <Box /> */}
							<SysFormButton variant="contained" color="primary" endIcon={<SysIcon name={'arrowForward'} />}>
								Entrar
							</SysFormButton>
						</FormWrapper>
					</SysForm>
				</FormContainer>
				<Box component="img" src="/images/wireframe/synergia-logo.svg" sx={{ width: '100%', maxWidth: '400px' }} />
			</Content>
		</Container>
	);
};

export default SignInPage;
