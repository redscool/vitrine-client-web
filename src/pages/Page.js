import { useNavigate, useParams } from "react-router-dom";
import Sky from "../components/space/page/template/Sky";
import { useEffect, useState } from "react";
import { resource_request_with_access_token } from "../utils/Service";
import {
	ORDER_ITEM_TYPE,
	ORDER_PLAN_TYPES,
	PAGE_TEMPLATES,
} from "../constants";
import { useDispatch } from "react-redux";
import { setCart } from "../redux/orderReducer.js";

function NotFound() {
	return <div>Not Found</div>;
}

export default function Page() {
	const params = useParams();
	const spaceId = params.spaceId;
	const [pageData, setPageData] = useState();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		resource_request_with_access_token(
			"get",
			"/api/community/space/getPage",
			{ id: spaceId },
			({ data }) => {
				setPageData(data.pageData);
			},
			console.log
		);
	}, []);

	const transactHandler = (spaceId) => {
		dispatch(
			setCart({
				item: spaceId,
				itemType: ORDER_ITEM_TYPE.SPACE,
				planDetails: ORDER_PLAN_TYPES.MONTHLY,
			})
		);
		navigate("/order");
	};

	const Template =
		{
			[PAGE_TEMPLATES[0]]: Sky,
		}[pageData?.template] ?? NotFound;

	return (
		<>
			<Template
				pageData={pageData}
				transactHandler={transactHandler}
			/>
		</>
	);
}
