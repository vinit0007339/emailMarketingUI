import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Switch,
  FormControlLabel,
  Link,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Checkbox,
  Divider,
  Stack,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Search as SearchIcon,
  Star as StarIcon,
  Help as HelpIcon,
  Close as CloseIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";
import { getAllData, addData } from "../../Utility/API";
import { endPoints } from "../../constant/Environment";
import { setLoading } from "../../redux/Reducers/GlobalReducer/globalSlice";

const RecipientScreen = ({onBack}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const campaignData = location.state?.campaignData || {};
  
  const [selectedLists, setSelectedLists] = useState([]);
  const [selectedSegments, setSelectedSegments] = useState([]);
  const [initialLists, setInitialLists] = useState([]);
  const [initialSegments, setInitialSegments] = useState([]);
  const [smartSending, setSmartSending] = useState(true);
  const [trackingEnabled, setTrackingEnabled] = useState(false);
  const [showAudienceDropdown, setShowAudienceDropdown] = useState(false);
  const [showExcludeDropdown, setShowExcludeDropdown] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [listData, setListData] = useState([]);
  const [segmentsData, setSegmentsData] = useState([]);

  // Format API data for dropdown options
  const formatListData = (data) =>
    data.map((item) => ({
      id: item._id || item.id,
      name: item.name,
      count: item.members || item.count || 0,
      type: "list",
      starred: item.starred || false,
    }));

  const formatSegmentData = (data) =>
    data.map((item) => ({
      id: item._id || item.id,
      name: item.name,
      count: item.members || item.count || 0,
      type: "segment",
      starred: item.starred || false,
    }));

  const allAudienceOptions = [...formatListData(listData), ...formatSegmentData(segmentsData)];

  const filteredOptions = allAudienceOptions.filter((option) =>
    option.name.toLowerCase().includes(filterText.toLowerCase())
  );

  // Calculate estimated recipients from selected lists and segments
  const estimatedRecipients = [...selectedLists, ...selectedSegments].reduce((total, item) => total + (item.count || 0), 0);

  // Helper function to check if selections have changed
  const hasSelectionsChanged = () => {
    // Compare lists
    const listsChanged = selectedLists.length !== initialLists.length ||
      selectedLists.some(list => !initialLists.some(initial => initial.id === list.id)) ||
      initialLists.some(initial => !selectedLists.some(list => list.id === initial.id));
    
    // Compare segments
    const segmentsChanged = selectedSegments.length !== initialSegments.length ||
      selectedSegments.some(segment => !initialSegments.some(initial => initial.id === segment.id)) ||
      initialSegments.some(initial => !selectedSegments.some(segment => segment.id === initial.id));
    
    return listsChanged || segmentsChanged;
  };

  // API calls
  const getAllLists = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      let response = await getAllData(endPoints.api.GET_ALL_LIST);
      dispatch(setLoading(false));
      const payload = response?.data ?? response;
      // Support multiple shapes: {lists, segments}, {data:{lists,segments}}, or array
      const lists = Array.isArray(payload)
        ? payload
        : payload?.lists ?? payload?.data?.lists ?? [];
      const segments = Array.isArray(payload?.segments)
        ? payload.segments
        : payload?.data?.segments ?? [];
      setListData(lists);
      setSegmentsData(segments);
    } catch (err) {
      dispatch(setLoading(false));
      console.log("Error while fetching lists", err);
    }
  }, [dispatch]);

  const getAllSegments = useCallback(async () => {
    try {
      // Note: Replace with actual segments endpoint when available
      // For now, using empty array as segments endpoint might not exist
      setSegmentsData([]);
    } catch (err) {
      console.log("Error while fetching segments", err);
    }
  }, []);

  // Load existing campaign targets
  const loadCampaignTargets = useCallback(async () => {
    if (!campaignData.id) return;
    
      try {
        const response = await getAllData(endPoints.api.GET_CAMPAIGN_TARGETS(campaignData.id));
        console.log("Campaign targets:", response);
        if (response && response.data) {
          const { lists = [], segments = [] } = response.data;
          
          // Transform the response data to match our component's expected format
          const transformedLists = lists.map(list => ({
            id: list.list_id,
            name: list.list_name,
            count: 0, // You might want to fetch this from another API
            type: "list",
            starred: false
          }));
          
          const transformedSegments = segments.map(segment => ({
            id: segment.segment_id,
            name: segment.segment_name,
            count: 0, // You might want to fetch this from another API
            type: "segment",
            starred: false
          }));
          
          // Set the selected lists and segments
          setSelectedLists(transformedLists);
          setSelectedSegments(transformedSegments);
          
          // Store initial state for comparison
          setInitialLists(transformedLists);
          setInitialSegments(transformedSegments);
        }
    } catch (err) {
      console.log("Error while loading campaign targets", err);
    }
  }, [campaignData.id]);

  // Save campaign targets
  const saveTargets = useCallback(async () => {
    if (!campaignData.id) return;
    
    try {
      const requestBody = {
        lists: selectedLists.map(list => ({
          list_id: list.id,
          list_name: list.name
        })),
        segments: selectedSegments.map(segment => ({
          segment_id: segment.id,
          segment_name: segment.name
        }))
      };
      dispatch(setLoading(true));
      const response = await addData(endPoints.api.POST_CAMPAIGN_TARGETS(campaignData.id), requestBody);
      dispatch(setLoading(false));
      if (response && response.data) {
        console.log("Campaign targets saved successfully", response.data);
        return true;
      }
    } catch (err) {
      dispatch(setLoading(false));
      console.log("Error while saving campaign targets", err);
      return false;
    }
  }, [campaignData.id, selectedLists, selectedSegments, dispatch]);

  useEffect(() => {
    getAllLists();
    getAllSegments();
  }, [getAllLists, getAllSegments]);

  // Load campaign targets when component mounts
  useEffect(() => {
    loadCampaignTargets();
  }, [loadCampaignTargets]);

  const handleAudienceSelect = (option) => {
    if (option.type === "list") {
      const isSelected = selectedLists.some(list => list.id === option.id);
      if (isSelected) {
        setSelectedLists(prev => prev.filter(list => list.id !== option.id));
      } else {
        setSelectedLists(prev => [...prev, option]);
      }
    } else if (option.type === "segment") {
      const isSelected = selectedSegments.some(segment => segment.id === option.id);
      if (isSelected) {
        setSelectedSegments(prev => prev.filter(segment => segment.id !== option.id));
      } else {
        setSelectedSegments(prev => [...prev, option]);
      }
    }
  };


  const handleBack = () => {
    navigate("/campaigns");
  };

  const handleNext = async () => {
    // Only save campaign targets if there are changes
    if (hasSelectionsChanged()) {
      console.log("Selections have changed, saving campaign targets...");
      const saveSuccess = await saveTargets();
      if (!saveSuccess) {
        console.error("Failed to save campaign targets");
        // You might want to show an error message to the user here
        return;
      }
    } else {
      console.log("No changes in selections, skipping API call");
    }

    const recipientData = {
      selectedLists,
      selectedSegments,
      smartSending,
      trackingEnabled,
    };
    // Navigate to message screen with campaign and recipient data
    console.log("Recipient data:", { ...campaignData, ...recipientData });
    navigate("/message", { 
      state: { 
        campaignData,
        recipientData 
      } 
    });
  };

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", p: 3 }}>
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
            <Button
              variant="outlined"
              onClick={handleBack}
              sx={{ minWidth: "auto", px: 2 }}
            >
              ← Back to Campaigns
            </Button>
            {campaignData.name && (
              <Typography variant="body2" color="text.secondary">
                Campaign: {campaignData.name}
              </Typography>
            )}
          </Stack>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Audience
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Configure your campaign audience and tracking settings
          </Typography>
        </Box>

        <Stack spacing={3}>
          {/* Audience Selection Card */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              border: "1px solid #e0e0e0",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Audience
            </Typography>

            <Stack spacing={3}>
              {/* Send to Field */}
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Send to
                </Typography>
                <Box sx={{ position: "relative" }}>
                <TextField
                  fullWidth
                  placeholder="Select lists or segments"
                  value={
                    [...selectedLists, ...selectedSegments].length > 0
                      ? `${[...selectedLists, ...selectedSegments].length} item(s) selected`
                      : ""
                  }
                  onClick={() => setShowAudienceDropdown(!showAudienceDropdown)}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          {showAudienceDropdown ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: showAudienceDropdown ? "#1976d2" : "#e0e0e0",
                        },
                      },
                    }}
                  />

                  {/* Dropdown */}
                  {showAudienceDropdown && (
                    <Paper
                      elevation={3}
                      sx={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        zIndex: 1000,
                        mt: 1,
                        maxHeight: 300,
                        overflow: "auto",
                      }}
                    >
                      <Box sx={{ p: 2 }}>
                        <TextField
                          fullWidth
                          size="small"
                          placeholder="Filter"
                          value={filterText}
                          onChange={(e) => setFilterText(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          }}
                          sx={{ mb: 2 }}
                        />

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1, fontWeight: 500 }}
                        >
                          List
                        </Typography>
                        <List dense>
                          {filteredOptions
                            .filter((option) => option.type === "list")
                            .map((option) => (
                              <ListItem key={option.id} disablePadding>
                                <ListItemButton
                                  onClick={() => handleAudienceSelect(option)}
                                  sx={{ py: 0.5 }}
                                >
                                  <ListItemIcon sx={{ minWidth: 40 }}>
                                    <Checkbox
                                      checked={selectedLists.some(list => list.id === option.id)}
                                      size="small"
                                    />
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={
                                      <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Typography variant="body2">
                                          {option.name} ({option.count})
                                        </Typography>
                                        {option.starred && (
                                          <StarIcon sx={{ fontSize: 16, color: "#ffc107", ml: 1 }} />
                                        )}
                                      </Box>
                                    }
                                  />
                                </ListItemButton>
                              </ListItem>
                            ))}
                        </List>

                        <Divider sx={{ my: 1 }} />

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1, fontWeight: 500 }}
                        >
                          Segment
                        </Typography>
                        <List dense>
                          {filteredOptions
                            .filter((option) => option.type === "segment")
                            .map((option) => (
                              <ListItem key={option.id} disablePadding>
                                <ListItemButton
                                  onClick={() => handleAudienceSelect(option)}
                                  sx={{ py: 0.5 }}
                                >
                                  <ListItemIcon sx={{ minWidth: 40 }}>
                                    <Checkbox
                                      checked={selectedSegments.some(segment => segment.id === option.id)}
                                      size="small"
                                    />
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={
                                      <Typography variant="body2">
                                        {option.name} ({option.count})
                                      </Typography>
                                    }
                                  />
                                </ListItemButton>
                              </ListItem>
                            ))}
                        </List>
                      </Box>
                    </Paper>
                  )}
                </Box>
              </Box>

              {/* Selected Items Display */}
              {(selectedLists.length > 0 || selectedSegments.length > 0) && (
                <Box>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                    Selected Items:
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                    {selectedLists.map((list) => (
                      <Box
                        key={list.id}
                        sx={{
                          bgcolor: "#e3f2fd",
                          color: "#1976d2",
                          px: 2,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: "0.75rem",
                          display: "flex",
                          alignItems: "center",
                          mr: 1,
                          mb: 1,
                        }}
                      >
                        <Typography variant="caption">{list.name}</Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleAudienceSelect(list)}
                          sx={{ p: 0, ml: 1 }}
                        >
                          <CloseIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                      </Box>
                    ))}
                    {selectedSegments.map((segment) => (
                      <Box
                        key={segment.id}
                        sx={{
                          bgcolor: "#f3e5f5",
                          color: "#7b1fa2",
                          px: 2,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: "0.75rem",
                          display: "flex",
                          alignItems: "center",
                          mr: 1,
                          mb: 1,
                        }}
                      >
                        <Typography variant="caption">{segment.name}</Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleAudienceSelect(segment)}
                          sx={{ p: 0, ml: 1 }}
                        >
                          <CloseIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}

              {/* Don't send to Field */}
              <Box>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => setShowExcludeDropdown(!showExcludeDropdown)}
                  sx={{ textDecoration: "none" }}
                >
                  + Don't send to
                </Link>
              </Box>

              {/* Smart Sending Toggle */}
              <FormControlLabel
                control={
                  <Switch
                    checked={smartSending}
                    onChange={(e) => setSmartSending(e.target.checked)}
                    color="primary"
                  />
                }
                label={
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Turn on Smart Sending
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      This campaign will not be sent to profiles who received a message from you in
                      the past{" "}
                      <Typography component="span" sx={{ fontWeight: 600 }}>
                        16 hours
                      </Typography>
                      . Smart Sending timeframes can be updated in{" "}
                      <Link href="#" sx={{ textDecoration: "none" }}>
                        account settings
                      </Link>
                      .
                    </Typography>
                  </Box>
                }
                sx={{ alignItems: "flex-start" }}
              />
            </Stack>
          </Paper>

          {/* Tracking Card */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              border: "1px solid #e0e0e0",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Tracking
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={trackingEnabled}
                  onChange={(e) => setTrackingEnabled(e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Include tracking parameters
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Links in this campaign will include additional tracking information, called UTM
                    parameters. This allows source tracking within third-party reporting tools such
                    as Google Analytics.{" "}
                    <Link href="#" sx={{ textDecoration: "none" }}>
                      Learn more about UTM Tracking
                    </Link>
                  </Typography>
                </Box>
              }
              sx={{ alignItems: "flex-start" }}
            />
          </Paper>

          {/* Estimated Recipients */}
          <Box
            sx={{
              position: "fixed",
              right: 24,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "white",
              p: 2,
              borderRadius: 2,
              boxShadow: 2,
              minWidth: 200,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {estimatedRecipients}
              </Typography>
              <HelpIcon sx={{ color: "text.secondary", fontSize: 16 }} />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Estimated recipients
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button variant="outlined" onClick={onBack}>
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={selectedLists.length === 0 && selectedSegments.length === 0}
            >
              Next
            </Button>
          </Box>
        </Stack>

        {/* Notification Banner */}
        {/* {showNotification && (
          <Alert
            severity="info"
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 0,
              "& .MuiAlert-message": {
                display: "flex",
                alignItems: "center",
                gap: 1,
              },
            }}
            action={
              <IconButton
                size="small"
                onClick={() => setShowNotification(false)}
                sx={{ color: "inherit" }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          >
            You can now configure tags and campaign name through selecting the gear icon at the top
            of the page.
          </Alert>
        )} */}

        {/* Help Button */}
        {/* <IconButton
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            bgcolor: "black",
            color: "white",
            "&:hover": {
              bgcolor: "grey.800",
            },
          }}
        >
          <HelpIcon />
        </IconButton> */}
      </Box>
    </Box>
  );
};

export default RecipientScreen;
