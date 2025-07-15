document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  const weightInput = document.getElementById('weight');
  const heightInput = document.getElementById('height');
  const infos = document.getElementById('infos');
  const valueSpan = document.getElementById('value');
  const description = document.getElementById('description');
  const bmiIndicator = document.getElementById('bmi-indicator');
  const moreInfo = document.getElementById('more_info');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);

    if (isNaN(weight) || weight <= 0) {
      alert('Por favor, insira um peso válido.');
      return;
    }

    if (isNaN(height) || height <= 0) {
      alert('Por favor, insira uma altura válida.');
      return;
    }

    // Calcula IMC
    const bmi = weight / (height * height);
    const bmiRounded = bmi.toFixed(1);

    // Atualiza o valor na tela
    valueSpan.textContent = bmiRounded;

    // Define descrição e posição do indicador
    let desc = '';
    let indicatorPercent = 0; // posição do indicador na barra (0 a 100%)

    if (bmi < 18.5) {
      desc = 'Abaixo do peso';
      indicatorPercent = (bmi / 18.5) * 25; // mapeia para os 25% da barra azul
    } else if (bmi < 24.9) {
      desc = 'Peso normal';
      indicatorPercent = 25 + ((bmi - 18.5) / (24.9 - 18.5)) * 25; // 25% a 50%
    } else if (bmi < 29.9) {
      desc = 'Sobrepeso';
      indicatorPercent = 50 + ((bmi - 24.9) / (29.9 - 24.9)) * 25; // 50% a 75%
    } else {
      desc = 'Obesidade';
      indicatorPercent = 75 + Math.min((bmi - 29.9) / 10 * 25, 25); // 75% a 100%
    }

    description.textContent = desc;

    // Atualiza barra indicador
    bmiIndicator.style.position = 'relative';
    bmiIndicator.style.height = '10px';
    bmiIndicator.style.marginTop = '-20px';
    bmiIndicator.style.background = 'transparent';

    // Cria ou move um pequeno triângulo indicador na barra
    if (!document.getElementById('indicator-triangle')) {
      const tri = document.createElement('div');
      tri.id = 'indicator-triangle';
      tri.style.position = 'absolute';
      tri.style.top = '0';
      tri.style.width = '0';
      tri.style.height = '0';
      tri.style.borderLeft = '8px solid transparent';
      tri.style.borderRight = '8px solid transparent';
      tri.style.borderBottom = '10px solid #00796b';
      bmiIndicator.appendChild(tri);
    }

    const tri = document.getElementById('indicator-triangle');
    tri.style.left = `calc(${indicatorPercent}% - 8px)`; // centraliza o triângulo

    // Exibe resultados
    infos.classList.remove('hidden');
    moreInfo.classList.remove('hidden');
  });
});
