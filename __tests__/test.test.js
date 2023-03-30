const {InfoTheoryWorld} = require('../src/InfoTheoryWorld.js');

test ('it should trim right', ()=> {
  let words_test = ['hello', 'chats', 'arkes', 'mommy', 'dorks', 'santa']
  let xxx = new InfoTheoryWorld(words_test);
  xxx.trimWordSpace(['l', 'y', 'l', 'l', 'y'], 'brink')
  expect(xxx.wordSpace.length).toBe(1);
})

test ('it should trim right2', ()=> {
  let words_test = ['hello', 'chats', 'arkes', 'mommy', 'dorks', 'santa', 'tongo']
  let xxx = new InfoTheoryWorld(words_test);
  xxx.trimWordSpace(['l', 'l', 'l', 'l', 'l'], 'zyzzz')
  expect(xxx.wordSpace.length).toBe(6);
})

test ('it should trim right3', ()=> {
  let words_test = ['hello', 'chats', 'arkes', 'mommy', 'dorks', 'santa', 'tongo']
  let xxx = new InfoTheoryWorld(words_test);
  xxx.trimWordSpace(['l', 'l', 'l', 'l', 'l'], 'zyzzs')
  expect(xxx.wordSpace.length).toBe(2);
})

test ('it should trim right4', ()=> {
  let words_test = ['hello', 'chats', 'arkes', 'mommy', 'dorks', 'santa', 'tongo']
  let xxx = new InfoTheoryWorld(words_test);
  xxx.trimWordSpace(['g', 'l', 'l', 'l', 'y'], 'syzzs')
  expect(xxx.wordSpace.length).toBe(0);
})

test ('it should trim right5', ()=> {
  let words_test = ['hello', 'chats', 'arkes', 'mommy', 'dorks', 'sants', 'tongo']
  let xxx = new InfoTheoryWorld(words_test);
  xxx.trimWordSpace(['g', 'l', 'l', 'l', 'y'], 'syzzs')
  expect(xxx.wordSpace.length).toBe(0);
})

test ('it should trim right6', ()=> {
  //actual= ENEMA
  let words_test = ['among','bicep','bushy','clump','denim','enema','fluff','gourd','hunky','leggy','minus','overt','print','rider','shale','sneak','stony','threw','upper','world'];

  let xxx = new InfoTheoryWorld(words_test);
  xxx.trimWordSpace(['l', 'y', 'l', 'l', 'y'], 'raise')
  expect(xxx.wordSpace.length).toBe(1);
})

test ('it should trim right7', ()=> {
  //actual= BICEP
  let words_test = ['among','bicep','bushy','clump','denim','enema','fluff','gourd','hunky','leggy','minus','overt','print','rider','shale','sneak','stony','threw','upper','world'];

  let xxx = new InfoTheoryWorld(words_test);
  xxx.trimWordSpace(['l', 'l', 'y', 'l', 'y'], 'raise')
  expect(xxx.wordSpace.length).toBe(2);
  expect(xxx.wordSpace[0]).toBe('bicep');
  expect(xxx.wordSpace[1]).toBe('denim');
})

test ('it should trim right8', ()=> {
  let words_test = ['among','bicep','bushy','clump','denim','enema','fluff','gourd','hunky','leggy','minus','overt','print','rider','shale','sneak','stony','threw','upper','world'];

  let xxx = new InfoTheoryWorld(words_test); // print
  xxx.trimWordSpace(['l', 'g', 'g', 'l', 'l'], 'crime')
  expect(xxx.wordSpace.length).toBe(1);
  expect(xxx.wordSpace[0]).toBe('print');
})

test ('it should trim right9', ()=> {
  let words_test = ['among','bicep','bushy','clump','denim','enema','fluff','gourd','hunky','leggy','minus','overt','print','rider','shale','sneak','stony','threw','upper','world'];

  let xxx = new InfoTheoryWorld(words_test); // among
  xxx.trimWordSpace(['y', 'y', 'l', 'l', 'l'], 'madam')
  expect(xxx.wordSpace.length).toBe(2);
  expect(xxx.wordSpace[0]).toBe('among');
  expect(xxx.wordSpace[1]).toBe('enema');
})

test ('it should trim right 10', ()=> {
  let words_test = ['among','bicep','bushy','clump','denim','enema','fluff','gourd','hunky','leggy','minus','overt','print','rider','shale','sneak','stony','threw','upper','world', 'madam', 'civic', 'radar', 'level', 'rotor', 'kayak', 'refer'];

  let xxx = new InfoTheoryWorld(words_test); // threw
  xxx.trimWordSpace(['l', 'y', 'l', 'l', 'l'], 'fella')
  expect(xxx.wordSpace.length).toBe(5);
  expect(xxx.wordSpace.join('')).toBe(['bicep','overt','rider','threw','upper'].join(''));
})

test ('it should trim right 11', ()=> {
  let words_test = ['among','bicep','bushy','clump','denim','enema','fluff','gourd','hunky','leggy','minus','overt','print','rider','shale','sneak','stony','threw','upper','world', 'madam', 'civic', 'radar', 'level', 'rotor', 'kayak', 'refer', 'peeps'];

  let xxx = new InfoTheoryWorld(words_test); // threw
  xxx.trimWordSpace(['l', 'y', 'l', 'l', 'l'], 'fella')
  expect(xxx.wordSpace.length).toBe(5);
  expect(xxx.wordSpace.join('')).toBe(['bicep','overt','rider','threw','upper'].join(''));
})

test ('it should trim right 12', ()=> {
  let words_test = ['among','bicep','bushy','clump','denim','enema','fluff','gourd','hunky','leggy','minus','overt','print','rider','shale','sneak','stony','threw','upper','world', 'madam', 'civic', 'radar', 'level', 'rotor', 'kayak', 'refer', 'peeps', 'awful', 'tramp', 'crock', 'basal', 'denim', 'dirge', 'blunt', 'squash', 'weedy'];

  let xxx = new InfoTheoryWorld(words_test); // weedy
  xxx.trimWordSpace(['l', 'l', 'l', 'g', 'y'], 'pride')
  expect(xxx.wordSpace.length).toBe(1);
  expect(xxx.wordSpace.join('')).toBe(['weedy'].join(''));
})

test ('it should trim right 13', ()=> {
  let words_test = ['among','bicep','bushy','clump','denim','enema','fluff','gourd','hunky','leggy','minus','overt','print','rider','shale','sneak','stony','threw','upper','world', 'madam', 'civic', 'radar', 'level', 'rotor', 'kayak', 'refer', 'peeps', 'awful', 'tramp', 'crock', 'basal', 'denim', 'dirge', 'blunt', 'squash', 'weedy','brown'];

  let xxx = new InfoTheoryWorld(words_test); // brown
  xxx.trimWordSpace(['l', 'l', 'y', 'l', 'l'], 'handy')
  expect(xxx.wordSpace.length).toBe(3);
  expect(xxx.wordSpace.join('')).toBe(['print','blunt','brown'].join(''));
})
