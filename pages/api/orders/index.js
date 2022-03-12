import nc from 'next-connect';
import Order from '../../../models/Order';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';
import { isAuth } from '../../../utils/auth';
const handler = nc({
  onError,
});
handler.use(isAuth); //only authenticated user have access

handler.post(async (req, res) => {
  await db.connect();
  const newOrder = new Order({
    ...req.body,
    //req.body mefihech l user donc bch njibouh m token
    user: req.user._id,
  });
  const order = await newOrder.save();

  res.status(201).send(order);
});
export default handler;
