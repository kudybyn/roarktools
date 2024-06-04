import Skeleton from '@mui/material/Skeleton';

export function LinesSkeleton({ count = 1,styles={} }) {
    const skeletons = Array.from({ length: count }, (_, index) => (
      <Skeleton key={index} animation="wave" sx={styles}/>
    ));
  
    return <div>{skeletons}</div>;
  }



  export function RectangularSkeleton({ count = 1,styles={} }) {
    const skeletons = Array.from({ length: count }, (_, index) => (
        <Skeleton variant="rectangular" key={index} width={210} height={118} sx={styles}/>
    ));
  
    return <div className="flex gap-2">{skeletons}</div>;
  }


  
  export function CircularSkeleton({ count = 1,styles={} }) {
    const skeletons = Array.from({ length: count }, (_, index) => (
        <Skeleton variant="circular" key={index} width={210} height={118} sx={styles}/>
    ));
  
    return <div className="flex gap-2">{skeletons}</div>;
  }