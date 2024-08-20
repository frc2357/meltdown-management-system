import {
  AppBar,
  CSSObject,
  Theme,
  useTheme,
  Box,
  Button,
  Drawer,
  Icon,
  IconButton,
  Toolbar,
  Typography,
  styled,
  AppBarProps,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { ExampleTitle } from './components/ExampleTitle';
import SystemMeltDownGearLogo from './assets/SystemMeltdownGearLogo.png';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Star } from '@mui/icons-material';
import { Dashboard } from './components/Dashboard';
import { Inventory } from './components/Inventory';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface Custom_AppBarProps extends AppBarProps {
  open?: boolean;
}

const Custom_AppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<Custom_AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - 70px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Custom_Drawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  })
);

export const App: React.FC = (): ReactElement => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState<number>(0);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleChangePage = (index:number) => {
    handleDrawerClose();
    setCurrentPage(index);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: 60,
        minWidth: 60,
      }}
    >
      <Custom_AppBar open={open} sx={{ mr: 1 }}>
        <Toolbar>
          <IconButton
            edge="start"
            sx={{ ...(open && { display: 'none' }) }}
            onClick={handleDrawerOpen}
          >
            <img src={SystemMeltDownGearLogo} width={40} />
          </IconButton>
          <Typography variant="h6" component="div">
            Meltdown Management System: Workshop
          </Typography>
        </Toolbar>
      </Custom_AppBar>

      <Custom_Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton edge="start" sx={{ mr: 21.5 }} onClick={handleDrawerClose}>
            <img src={SystemMeltDownGearLogo} width={40} />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Dashboard', 'Inventory', 'Loaner Program', 'Template'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton 
                onClick={() => handleChangePage(index)}
                component={Link}
                to={'/' + text.replace(" ","")}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index == currentPage ? (
                    <Icon color="primary">
                      <Star />
                    </Icon>
                  ) : (
                    <Icon>
                      <Star />
                    </Icon>
                  )}
                </ListItemIcon>

                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Custom_Drawer>

      <Routes>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Inventory" element={<Inventory />} />
      </Routes>
    </Box>
  );
};
