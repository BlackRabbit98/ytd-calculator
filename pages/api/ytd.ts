// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { differenceInCalendarDays, isLeapYear } from 'date-fns';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
	daysCovered: number;
	annualPay: number;
};

type Request = {
	startDate: string;
	endDate: string;
	grossIncome: number;
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { startDate, endDate, grossIncome } = req.body as Request;
	const totalDays = isLeapYear(new Date()) ? 366 : 365;
	const daysCovered = differenceInCalendarDays(
		new Date(endDate),
		new Date(startDate)
	);
	const annualPay = Number(
		((grossIncome / daysCovered) * totalDays).toFixed(2)
	);
	res.status(200).json({
		daysCovered,
		annualPay,
	});
}
