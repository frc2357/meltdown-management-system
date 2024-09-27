import { CardActionArea, CardContent, CardHeader, IconButton, Typography, styled } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { AppCard } from '../AppCard';
import React, { useState } from 'react';

export type PTemplateCard = {
  template: string;
};

export function TemplateCard({ template }: PTemplateCard): React.JSX.Element {
  const [isHover, setIsHover] = useState<boolean>();

  return (
    <AppCard key={template}>
      <CardActionArea
        component={Link}
        onMouseOver={() => {
          setIsHover(true);
        }}
        onMouseOut={() => {
          setIsHover(false);
        }}
        to={template}
        sx={{ height: '100%', width: '100%'}}
      >
        {isHover ? (
          <CardHeader
            action={
              <>
                <IconButton  onMouseDown={e => e.stopPropagation()}>
                  <ContentCopyIcon />
                </IconButton>
                <IconButton onMouseDown={e => e.stopPropagation()}>
                  <DeleteIcon   sx={{ color: 'red' }} />
                </IconButton>
              </>
            }
          />
        ) : (<CardHeader action={<IconButton><DeleteIcon sx={{display: 'none'}}/></IconButton>}/>)}

        <CardContent sx={{ height: '100%', width: '100%'}}>
          <Typography sx={{ textAlign: 'center' }}>{template}</Typography>
        </CardContent>
      </CardActionArea>
    </AppCard>
  );
}
