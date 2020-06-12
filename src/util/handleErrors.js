function handleSubscrible(error) {
  let e;
  switch (error) {
    case "You can't subscribe at meetups that you organize":
      e = 'Você não pode se inscrever em meetups que você organiza';
      break;

    case "You can't subscribe at meetups that have already happened":
      e = 'Você não pode inscrever-se em meetupas que já aconteceram';
      break;
    case "You can't subscribe for the same meetup twice":
      e = 'Você não pode inscrever-se para o mesmo meetup duas vezes';
      break;
    case "You can't subscribe at two meetups that happen at the same time":
      e =
        'Você não pode inscrever-se em dois meetups que acontecem ao mesmo tempo';
      break;
    default:
      break;
  }
  return e;
}

export { handleSubscrible };
