import { List } from '@material-ui/core';
import {
  Box,
  Grid,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import db from '../utils/db';
import useStyles from '../utils/styles';
import Product from '../models/Product';

export default function Search({ categories }) {
  const classes = useStyles();
  const router = useRouter();
  const query = router.query;

  return (
    <Layout title="search">
      <Grid className={classes.mt1} container spacing={1}>
        <Grid item md={3}>
          <List>
            <ListItem>
              <Box className={classes.fullWidth}>
                <Typography>Categories</Typography>
                <Select fullWidth value={category} onChange={categoryHandler}>
                  <MenuItem value="all">All</MenuItem>
                  {categories &&
                    categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                </Select>
              </Box>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  db.connect();
  const category = query.category;
  const categories = await Product.find().distinct('category');
  db.disconnect();
  return {
    props: {
      categories,
    },
  };
}
