import { Request, Response } from 'express';
import OAuth from '../../lib/oauth';
import { wwsError } from '../../utils/wwsError';

export const renderSignin = (req: Request, res: Response) =>
  res.render('auth/signin');
export const renderSignup = (req: Request, res: Response) =>
  res.render('auth/signup');

export const redirectToAuth = (req: Request, res: Response) => {
  try {
    return res.redirect(OAuth[req.params.provider].authURL);
  } catch (err) {
    throw new wwsError(500, 'Problems moving to the consent screen');
  }
};

export const codeCallback = async (req: Request, res: Response) => {
  try {
    const authCode = req.query.code as string;
    const accessToken = await OAuth[req.params.provider].getAccessToken(
      authCode
    );

    return res.send(accessToken);
  } catch (err) {
    throw new wwsError(500, 'Problems processing Oauth');
  }
};
