const formatDate = (timestamp: number) =>
  new Date(timestamp).toLocaleDateString('en-US', {
    dateStyle: 'long',
  });

export default formatDate;
