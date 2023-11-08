import {
  faCartShopping,
  faClipboardList,
  faHeart,
  faHouse,
  faMessage,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { default as React, useContext, useEffect, useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { UserInfoContext } from "../../App";
import "./navBarAni.css";
import ShoppingCardIcon from "./ShoppingCardIcon";

// message icon style
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function NaviBar({
  productShowAnimation,
  setProductShowAnimation,
  setAniImg,
}) {
  let location = useLocation();

  console.log("this is location :", location.pathname);

  const [value, setValue] = React.useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let { url } = useRouteMatch();
  // react router dom history
  let history = useHistory();

  const [seasonData, setseasonData] = useState([]);

  useEffect(() => {
    setseasonData(JSON.parse(sessionStorage.getItem("addToShoppingCard")));
  }, []);

  // useEffect(() => {
  //   setProductList(JSON.parse(sessionStorage.getItem("addToShoppingCard")));
  // }, []);

  const [animationOn, setAnimationOn] = useState(false);

  const [animationimage, setAnimationimage] = useState();

  useEffect(() => {
    if (productShowAnimation != undefined) {
      console.log("this is nav bar : ", productShowAnimation);
      setAnimationOn(true);

      setAnimationimage(productShowAnimation);

      setTimeout(() => {
        setAnimationOn(false);
        setProductShowAnimation();
      }, 1000);
    }
  }, [productShowAnimation]);

  // use context
  const [loggingUserInfo, setLoginUsserInfo] = useContext(UserInfoContext);

  const optionName = (props) => {
    console.log(props);

    history.push(`/${props}`);
  };

  return (
    <div>
      <div className="fixed-bottom ">
        <div className="mx-auto" style={{ width: "100%" }}>
          <div
            className="w-100"
            style={{
              height: "50px",
              backgroundColor: "#FEC400",
              fontSize: "24px",
            }}
          >
            <div className=" p-2 d-flex justify-content-around">
              <div onClick={() => optionName("Home")}>
                <FontAwesomeIcon
                  style={{
                    color: `${
                      location.pathname === "/Home" ? "black" : "white"
                    }`,
                  }}
                  icon={faHouse}
                />
              </div>

              <div onClick={() => optionName("Favorite")}>
                <FontAwesomeIcon
                  style={{
                    color: `${
                      location.pathname === "/Favorite" ? "black" : "white"
                    }`,
                  }}
                  icon={faHeart}
                />
              </div>
              <div
                style={{ display: "none" }}
                onClick={() => optionName("MyMessage")}
              >
                <div ClassName="" style={{ position: "relative" }}>
                  <FontAwesomeIcon
                    style={{
                      color: `${
                        location.pathname === "/MyMessage" ? "black" : "white"
                      }`,
                    }}
                    icon={faMessage}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "-8px",
                      fontSize: "14px",
                      borderRadius: "100%",
                      backgroundColor: "#fec400",
                      padding: "2px",
                      right: "-4px",
                      fontFamily: "Poppins",
                      fontWeight: "600",
                    }}
                  >
                    <span>5</span>
                  </div>
                </div>
              </div>

              <div
                onClick={() => optionName("ShoppingCard")}
                style={{ padding: " 0px", margin: "0px", marginTop: "-4px" }}
              >
                <ShoppingCardIcon
                  setAniImg={setAniImg}
                  className="mainLogoShopping"
                  location={location}
                  faCartShopping={faCartShopping}
                  StyledBadge={StyledBadge}
                ></ShoppingCardIcon>
                <div
                  className={(animationOn === true && "picAni", "w-100")}
                  style={{
                    height: "150px",
                    display: `${animationOn === true ? "block" : "none"}`,
                  }}
                >
                  <div>
                    <div>
                      <img className="aniimg" src={animationimage} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div onClick={() => optionName("UserOrderPage")}>
                {" "}
                <FontAwesomeIcon
                  style={{
                    color: `${
                      location.pathname === "/UserOrderPage" ? "black" : "white"
                    }`,
                  }}
                  icon={faClipboardList}
                />
              </div>
              <div onClick={() => optionName("MyAccount")}>
                {loggingUserInfo.photoURL ? (
                  <img
                    className="img-fluid mb-1"
                    style={{ borderRadius: "50%", width: "30px" }}
                    src={loggingUserInfo.photoURL}
                    alt="user pic"
                  />
                ) : (
                  <FontAwesomeIcon
                    style={{
                      color: `${
                        location.pathname === "/MyAccount" ? "black" : "white"
                      }`,
                    }}
                    icon={faUser}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
