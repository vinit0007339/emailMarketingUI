import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Box, Button, Stack, Tab, Tabs, Typography, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DCButton from "../../../component/DCButton";
import Member from "./Member";
import CreateMember from "./Member/CreateMember";
import { endPoints } from "../../../constant/Environment";
import { getAllData } from "../../../Utility/API";
import { useDispatch } from "react-redux";
// import { setLoading } from "../../../redux/Reducers/GlobalReducer/globalSlice";

export default function ListDetails() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading , setLoading] = useState(false)
  const id = new URLSearchParams(location.search).get("id");

  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [addMember, setAddMember] = useState(false);
  const [listInfo, setListInfo] = useState("");
  const [membersData, setMemberData] = useState([]);

  useEffect(() => {
    if (id) {
      getMemberInfoById(id);
      getListById(id);
    }
  }, [id]);
  const getListById = async (id) => {
    try {
      setLoading(true)
      let response = await getAllData(`${endPoints.api.GET_LIST_BY_ID}/${id}`);
       setLoading(false)
      if (response.status === "success") {
        setListInfo(response.data);
      }
    } catch (err) {
       setLoading(false)
      console.log("Error while fetching campaigns", err);
    }
  };

  const getMemberInfoById = async (id) => {
    try {
       setLoading(true)
      let response = await getAllData(endPoints.api.LIST_IN_CONTACT(id));
       setLoading(false)
      if (response.status === "success") {
        setMemberData(response.data);
      }
    } catch (err) {
       setLoading(false)
      console.log("Error while fetching campaigns", err);
    }
  };
  // console.log("listImembersDatanfo ---", membersData);

  return (
    <Box>
      <Box
        sx={{
          mt: 4,
          marginRight: 4,
          marginLeft: 2,
        }}
      >
        <DCButton
          variant="text"
          color="primary"
          onClick={() => navigate("/lists")}
          sx={{ textTransform: "none", mb: 1 }}
          startIcon={<ArrowBackIosNewIcon fontSize="small" />}
        >
          List & segments
        </DCButton>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="center">
            <Typography variant="h5" fontWeight={700}>
              {listInfo?.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                bgcolor: "grey.200",
                px: 1,
                py: 0.25,
                borderRadius: 2,
                ml: 1,
              }}
            >
              List
            </Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              // endIcon={<KeyboardArrowDownIcon />}
              sx={{ textTransform: "none", fontWeight: 600 }}
              onClick={() => {
                setAddMember(true);
              }}
            >
              Quick Add
            </Button>
            {/* <Button
            variant="outlined"
            endIcon={<KeyboardArrowDownIcon />}
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            Manage List
          </Button> */}
          </Stack>
        </Stack>
      </Box>

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={(e, v) => setTab(v)}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tab label={`Members (${membersData.length})`} />
        <Tab label="Sign-up forms" />
        <Tab label="Subscribe & preferences pages" />
        <Tab label="Imports" />
        <Tab label="List growth" />
        <Tab label="Engagement" />
        <Tab label="Settings" />
      </Tabs>

      {tab === 0 && (
        loading ? (
          <Box mt={2}>
            {[...Array(5)].map((_, idx) => (
              <Box key={idx} sx={{ display: "flex", gap: 2, mb: 2 }}>
                <Skeleton variant="circular" width={32} height={32} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="text" width="60%" />
                </Box>
                <Skeleton variant="rectangular" width={80} height={32} />
              </Box>
            ))}
          </Box>
        ) : (
          <Member
            membersData={membersData}
            updateList={() => {
              getMemberInfoById(id);
            }}
          />
        )
      )}

      <CreateMember
        addMember={addMember}
        onClose={(flag) => {
          setAddMember(false);
          if (flag) {
            getMemberInfoById(id);
          }
        }}
      />
    </Box>
  );
}
