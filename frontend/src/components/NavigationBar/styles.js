// @mui
import { styled } from '@mui/material/styles';
import { ListItemIcon, ListItemButton } from '@mui/material';

// ----------------------------------------------------------------------

export const StyledNavItem = styled((props) => <ListItemButton disableGutters {...props} />)(
  ({ theme }) => ({
    ...theme.typography.body2,
    height: 50,
    position: 'relative',
    textTransform: 'capitalize',
    color: '#cfcfcf',
    borderRadius: theme.shape.borderRadius
  })
);

export const StyledNavItemIcon = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: '#cfcfcf',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});
