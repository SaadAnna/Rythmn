'use client';
import { useEffect, useRef, useState } from 'react';
import { Zap, Moon, Sun, Sparkles, BarChart3, Activity, Target, Coffee, TrendingUp, Calendar, Clock } from 'lucide-react';
import { Chart, registerables } from 'chart.js';

// Register all Chart.js components
Chart.register(...registerables);

type ChartType = Chart<'radar', number[], string> | null;

export default function EnergyOptimizer() {
  const [currentDate, setCurrentDate] = useState('');
  const [sleepQuality, setSleepQuality] = useState(7);
  const [mood, setMood] = useState(7);
  const [energyLevel, setEnergyLevel] = useState(7);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [energyScore, setEnergyScore] = useState(0);
  const [energyMessage, setEnergyMessage] = useState('');
  
  const comparisonChartRef = useRef<ChartType>(null);

  useEffect(() => {
    // Set current date
    const date = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setCurrentDate(date);

    // Initialize Chart.js if needed
    if (showResults) {
      generateEnergyChart();
      generateComparisonChart();
    }
  }, [showResults]);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setShowResults(false);

    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
      
      // Calculate energy score
      const score = Math.round((sleepQuality + mood + energyLevel) / 3 * 10);
      setEnergyScore(score);
      
      // Set energy message
      if (score > 70) {
        setEnergyMessage('Excellent! You\'re primed for a great day!');
      } else if (score > 50) {
        setEnergyMessage('Good energy levels - optimize with our recommendations');
      } else {
        setEnergyMessage('Low energy detected - follow our recovery plan');
      }
      
      // Generate charts
      generateEnergyChart();
      generateComparisonChart();
    }, 3000);
  };

  const handleUpdate = () => {
    setShowResults(false);
  };

  const generateEnergyChart = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const energyData = hours.map(hour => {
      const baseEnergy = Math.sin((hour - 6) * Math.PI / 12) * 40 + 50;
      const personalModifier = (sleepQuality + mood + energyLevel) / 3 * 10;
      return Math.max(10, Math.min(100, baseEnergy + personalModifier + Math.random() * 20 - 10));
    });

    const chartContainer = document.getElementById('energy-chart');
    if (!chartContainer) return;

    chartContainer.innerHTML = '';
    
    energyData.forEach((energy, index) => {
      const bar = document.createElement('div');
      bar.className = 'flex flex-col items-center group';
      
      const barInner = document.createElement('div');
      barInner.className = `w-3 rounded-t-full transition-all duration-500 ${
        energy > 80 ? 'bg-gradient-to-t from-green-400 to-green-300' :
        energy > 60 ? 'bg-gradient-to-t from-yellow-400 to-yellow-300' :
        energy > 40 ? 'bg-gradient-to-t from-orange-400 to-orange-300' :
        'bg-gradient-to-t from-red-400 to-red-300'
      }`;
      barInner.style.height = `${energy}%`;
      
      const timeLabel = document.createElement('span');
      timeLabel.className = 'text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity';
      timeLabel.textContent = `${index}:00`;
      
      bar.appendChild(barInner);
      bar.appendChild(timeLabel);
      chartContainer.appendChild(bar);
    });
  };

  const generateComparisonChart = () => {
    const ctx = document.getElementById('comparison-chart') as HTMLCanvasElement | null;
    if (!ctx) return;
    
    const chartContext = ctx.getContext('2d');
    if (!chartContext) return;
    
    // Destroy previous chart if it exists
    if (comparisonChartRef.current) {
      comparisonChartRef.current.destroy();
    }
    
    comparisonChartRef.current = new Chart(chartContext, {
      type: 'radar',
      data: {
        labels: ['Sleep Quality', 'Daily Energy', 'Daily Mood'],
        datasets: [{
          label: 'Your Wellness Metrics',
          data: [sleepQuality, energyLevel, mood],
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
          borderColor: 'rgba(99, 102, 241, 1)',
          pointBackgroundColor: [
            'rgba(99, 102, 241, 1)',
            'rgba(16, 185, 129, 1)',
            'rgba(234, 179, 8, 1)'
          ],
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(99, 102, 241, 1)',
          borderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: {
              display: true,
              color: 'rgba(209, 213, 219, 0.5)'
            },
            suggestedMin: 0,
            suggestedMax: 10,
            ticks: {
              stepSize: 2,
              backdropColor: 'transparent'
            },
            pointLabels: {
              font: {
                size: 14,
                weight: 600 as number
              },
              color: '#6b7280'
            },
            grid: {
              color: 'rgba(209, 213, 219, 0.5)'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: ${context.raw}/10`;
              }
            }
          }
        },
        elements: {
          line: {
            tension: 0.1
          }
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
        
         <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
Peakly
              </h1>
            </div>
            <div className="text-sm text-gray-500">
              <span>{currentDate}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Input Section */}
        <div id="input-section" className={`space-y-8 ${showResults || isAnalyzing ? 'hidden' : ''}`}>
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">
              How are you feeling today?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tell us about your current state and we&apos;ll optimize your energy throughout the day
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Sleep Quality Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Moon className="w-6 h-6 text-indigo-500" />
                  <h3 className="text-lg font-medium text-gray-800">Sleep Quality</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Poor</span>
                    <span>Amazing</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={sleepQuality}
                    onChange={(e) => setSleepQuality(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    style={{ background: 'linear-gradient(to right, #ef4444 0%, #f59e0b 50%, #10b981 100%)' }}
                  />
                  <div className="text-center">
                    <span className="text-2xl font-bold text-gray-800">{sleepQuality}/10</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mood Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Sun className="w-6 h-6 text-yellow-500" />
                  <h3 className="text-lg font-medium text-gray-800">Current Mood</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Poor</span>
                    <span>Amazing</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={mood}
                    onChange={(e) => setMood(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    style={{ background: 'linear-gradient(to right, #ef4444 0%, #f59e0b 50%, #10b981 100%)' }}
                  />
                  <div className="text-center">
                    <span className="text-2xl font-bold text-gray-800">{mood}/10</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Energy Level Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Zap className="w-6 h-6 text-green-500" />
                  <h3 className="text-lg font-medium text-gray-800">Energy Level</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Poor</span>
                    <span>Amazing</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={energyLevel}
                    onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    style={{ background: 'linear-gradient(to right, #ef4444 0%, #f59e0b 50%, #10b981 100%)' }}
                  />
                  <div className="text-center">
                    <span className="text-2xl font-bold text-gray-800">{energyLevel}/10</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleAnalyze}
              className="bg-gradient-to-r cursor-pointer from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full font-medium text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>Optimize My Energy</span>
              </div>
            </button>
          </div>
        </div>

        {/* Analyzing State */}
        <div id="analyzing-section" className={`text-center space-y-6 ${isAnalyzing ? '' : 'hidden'}`}>
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-10 flex items-center justify-center animate-pulse">
              <Zap className="w-8 h-8 text-white animate-bounce" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Analyzing your energy patterns...
          </h2>
          <div className="w-64 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" style={{ width: '70%' }}></div>
          </div>
        </div>

        {/* Results Section */}
        <div id="results-section" className={`space-y-8 ${showResults ? '' : 'hidden'}`}>
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">
              Your Energy Forecast
            </h2>
            <p className="text-lg text-gray-600">
              Based on your inputs, here&apos;s your personalized energy optimization plan
            </p>
          </div>

          {/* Energy Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">24-Hour Energy Curve</h3>
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-500">Today&apos;s Prediction</span>
              </div>
            </div>
          </div>

          {/* Comparison Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Wellness Comparison</h3>
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-500">Your Wellness Metrics</span>
              </div>
            </div>
            <div className="h-64">
              <canvas id="comparison-chart"></canvas>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-sm text-gray-500">Sleep Quality</div>
                <div className="text-xl font-bold text-indigo-600">{sleepQuality}/10</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Daily Energy</div>
                <div className="text-xl font-bold text-green-600">{energyLevel}/10</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Daily Mood</div>
                <div className="text-xl font-bold text-yellow-600">{mood}/10</div>
              </div>
            </div>
          </div>

          {/* Energy Score */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-6 text-white">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold">Energy Score</h3>
              <div className="text-5xl font-bold">{energyScore}%</div>
              <p className="text-blue-100">
                {energyMessage}
              </p>
            </div>
          </div>

          {/* Recommendations */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Personalized Recommendations</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Recommendation 1 */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:scale-105">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-amber-500">
                    <Coffee className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">Optimal Coffee Time</h4>
                    <p className="text-sm text-gray-600 mt-1">Have your first coffee between 9:30-11:30 AM for maximum effectiveness</p>
                    <div className="flex items-center space-x-1 mt-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">9:30 AM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendation 2 */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:scale-105">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-green-500">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">Peak Performance Window</h4>
                    <p className="text-sm text-gray-600 mt-1">Schedule important tasks during your energy peak hours</p>
                    <div className="flex items-center space-x-1 mt-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">2:00 PM - 4:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendation 3 */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:scale-105">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-blue-500">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">Meeting Optimization</h4>
                    <p className="text-sm text-gray-600 mt-1">Best time for challenging meetings and decisions</p>
                    <div className="flex items-center space-x-1 mt-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">10:00 AM - 12:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendation 4 */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:scale-105">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-purple-500">
                    <Moon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">Wind Down Time</h4>
                    <p className="text-sm text-gray-600 mt-1">Start preparing for sleep to maintain tomorrow&apos;s energy</p>
                    <div className="flex items-center space-x-1 mt-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">9:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="text-center">
            <button
              onClick={handleUpdate}
              className="bg-white cursor-pointer text-gray-800 px-8 py-4 rounded-xl font-medium text-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md"
            >
              Update My Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}