export const isShowPagination = (data: any) => {
  if (data && data.items.length > 10) {
    return true;
  }
  else {
    return false;
  }
};


export const setPageinationSize = (data: any) => {
  if (data) {
    if (data && data.length > 10) {
      return 10;
    }
    else {
      return data.length;
    }
  }
  else
    return 0;
};

export const isShowPaginationForUser = (data: any) => {
  if (data && data.length > 10) {
    return true;
  }
  else {
    return false;
  }
};
