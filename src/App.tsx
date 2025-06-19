import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  Trash2, 
  DollarSign, 
  Calculator, 
  Check, 
  X, 
  Receipt, 
  TrendingUp,
  ArrowRight,
  Edit3,
  UserPlus,
  Sparkles
} from 'lucide-react';

interface Person {
  id: string;
  name: string;
}

interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  participants: string[];
  category: string;
}

interface Settlement {
  from: string;
  to: string;
  amount: number;
}

function App() {
  const [people, setPeople] = useState<Person[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newPersonName, setNewPersonName] = useState('');
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    paidBy: '',
    participants: [] as string[],
    category: '🍕'
  });

  const categories = [
    { emoji: '🍕', label: 'Food' },
    { emoji: '🏨', label: 'Accommodation' },
    { emoji: '🚗', label: 'Transport' },
    { emoji: '🎬', label: 'Entertainment' },
    { emoji: '🛍️', label: 'Shopping' },
    { emoji: '💡', label: 'Utilities' }
  ];

  const addPerson = () => {
    if (newPersonName.trim()) {
      const newPerson: Person = {
        id: Date.now().toString(),
        name: newPersonName.trim()
      };
      setPeople([...people, newPerson]);
      setNewPersonName('');
    }
  };

  const removePerson = (id: string) => {
    setPeople(people.filter(p => p.id !== id));
    setExpenses(expenses.filter(e => e.paidBy !== id));
  };

  const addExpense = () => {
    if (newExpense.description && newExpense.amount && newExpense.paidBy && newExpense.participants.length > 0) {
      const expense: Expense = {
        id: Date.now().toString(),
        description: newExpense.description,
        amount: parseFloat(newExpense.amount),
        paidBy: newExpense.paidBy,
        participants: newExpense.participants,
        category: newExpense.category
      };
      setExpenses([...expenses, expense]);
      setNewExpense({
        description: '',
        amount: '',
        paidBy: '',
        participants: [],
        category: '🍕'
      });
      setShowExpenseForm(false);
    }
  };

  const removeExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const toggleParticipant = (personId: string) => {
    const participants = newExpense.participants.includes(personId)
      ? newExpense.participants.filter(p => p !== personId)
      : [...newExpense.participants, personId];
    setNewExpense({ ...newExpense, participants });
  };

  const calculateBalances = () => {
    const balances: { [key: string]: number } = {};
    
    people.forEach(person => {
      balances[person.id] = 0;
    });

    expenses.forEach(expense => {
      const perPersonAmount = expense.amount / expense.participants.length;
      
      // Add to payer's balance
      balances[expense.paidBy] += expense.amount;
      
      // Subtract from each participant's balance
      expense.participants.forEach(participant => {
        balances[participant] -= perPersonAmount;
      });
    });

    return balances;
  };

  const calculateSettlements = (): Settlement[] => {
    const balances = calculateBalances();
    const settlements: Settlement[] = [];
    
    const creditors = Object.entries(balances)
      .filter(([_, balance]) => balance > 0.01)
      .sort(([_, a], [__, b]) => b - a);
    
    const debtors = Object.entries(balances)
      .filter(([_, balance]) => balance < -0.01)
      .sort(([_, a], [__, b]) => a - b);

    let i = 0, j = 0;
    
    while (i < creditors.length && j < debtors.length) {
      const [creditorId, creditAmount] = creditors[i];
      const [debtorId, debtAmount] = debtors[j];
      
      const settlementAmount = Math.min(creditAmount, Math.abs(debtAmount));
      
      settlements.push({
        from: debtorId,
        to: creditorId,
        amount: settlementAmount
      });
      
      creditors[i][1] -= settlementAmount;
      debtors[j][1] += settlementAmount;
      
      if (creditors[i][1] < 0.01) i++;
      if (Math.abs(debtors[j][1]) < 0.01) j++;
    }
    
    return settlements;
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const averagePerPerson = people.length > 0 ? totalExpenses / people.length : 0;

  const getPersonName = (id: string) => people.find(p => p.id === id)?.name || 'Unknown';

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Bolt.new Badge */}
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href="https://bolt.new/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block hover:scale-110 transition-transform duration-200 drop-shadow-lg"
        >
          <img 
            src="/black_circle_360x360.png" 
            alt="Powered by Bolt.new" 
            className="w-16 h-16 rounded-full hover:shadow-2xl transition-shadow duration-200"
          />
        </a>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-white/20 backdrop-blur-lg rounded-2xl">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Expense Splitter
            </h1>
          </div>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Split expenses fairly among friends with smart calculations and beautiful results
          </p>
        </header>

        {!showResults ? (
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
            {/* People Section */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-white" />
                <h2 className="text-2xl font-bold text-white">People</h2>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">
                  {people.length}
                </span>
              </div>

              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newPersonName}
                  onChange={(e) => setNewPersonName(e.target.value)}
                  placeholder="Enter person's name..."
                  className="flex-1 px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  onKeyPress={(e) => e.key === 'Enter' && addPerson()}
                />
                <button
                  onClick={addPerson}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-all duration-200 flex items-center gap-2 hover:scale-105"
                >
                  <UserPlus className="w-5 h-5" />
                  Add
                </button>
              </div>

              <div className="space-y-3">
                {people.map((person) => (
                  <div key={person.id} className="flex items-center justify-between p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20">
                    <span className="text-white font-medium">{person.name}</span>
                    <button
                      onClick={() => removePerson(person.id)}
                      className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-400/20 rounded-lg transition-all duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {people.length < 2 && (
                <p className="text-amber-200 text-sm mt-4 text-center">
                  Add at least 2 people to start splitting expenses
                </p>
              )}
            </div>

            {/* Expenses Section */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Receipt className="w-6 h-6 text-white" />
                  <h2 className="text-2xl font-bold text-white">Expenses</h2>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">
                    {expenses.length}
                  </span>
                </div>
                {people.length >= 2 && (
                  <button
                    onClick={() => setShowExpenseForm(true)}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 flex items-center gap-2 hover:scale-105"
                  >
                    <Plus className="w-4 h-4" />
                    Add Expense
                  </button>
                )}
              </div>

              {/* Total Display */}
              {totalExpenses > 0 && (
                <div className="mb-6 p-4 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl border border-white/20">
                  <div className="flex items-center justify-between">
                    <span className="text-white/90">Total Expenses:</span>
                    <span className="text-2xl font-bold text-white">${totalExpenses.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-white/70 text-sm">Average per person:</span>
                    <span className="text-white/90">${averagePerPerson.toFixed(2)}</span>
                  </div>
                </div>
              )}

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {expenses.map((expense) => (
                  <div key={expense.id} className="p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">{expense.category}</span>
                          <h3 className="font-semibold text-white">{expense.description}</h3>
                        </div>
                        <div className="text-sm text-white/70 space-y-1">
                          <p>Paid by: <span className="text-white">{getPersonName(expense.paidBy)}</span></p>
                          <p>Split between: <span className="text-white">{expense.participants.map(id => getPersonName(id)).join(', ')}</span></p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-white">${expense.amount.toFixed(2)}</span>
                        <button
                          onClick={() => removeExpense(expense.id)}
                          className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-400/20 rounded-lg transition-all duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {people.length >= 2 && expenses.length > 0 && (
                <button
                  onClick={() => setShowResults(true)}
                  className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105 font-semibold"
                >
                  <Sparkles className="w-5 h-5" />
                  Calculate Settlements
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Results Section */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Settlement Results</h2>
                <p className="text-white/80">Here's how to settle up efficiently</p>
              </div>

              {/* Summary Stats */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20 text-center">
                  <TrendingUp className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">${totalExpenses.toFixed(2)}</div>
                  <div className="text-white/70">Total Expenses</div>
                </div>
                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20 text-center">
                  <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{people.length}</div>
                  <div className="text-white/70">People</div>
                </div>
                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20 text-center">
                  <DollarSign className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">${averagePerPerson.toFixed(2)}</div>
                  <div className="text-white/70">Per Person</div>
                </div>
              </div>

              {/* Individual Balances */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Individual Balances</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {Object.entries(calculateBalances()).map(([personId, balance]) => (
                    <div key={personId} className={`p-4 rounded-xl border ${
                      balance > 0.01 
                        ? 'bg-emerald-500/20 border-emerald-400/30' 
                        : balance < -0.01 
                        ? 'bg-rose-500/20 border-rose-400/30'
                        : 'bg-white/20 border-white/20'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-white">{getPersonName(personId)}</span>
                        <span className={`font-bold ${
                          balance > 0.01 ? 'text-emerald-400' : balance < -0.01 ? 'text-rose-400' : 'text-white'
                        }`}>
                          {balance > 0.01 ? '+' : ''}${balance.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-sm text-white/70 mt-1">
                        {balance > 0.01 ? 'Should receive' : balance < -0.01 ? 'Owes money' : 'All settled'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Settlement Instructions */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Settlement Instructions</h3>
                {calculateSettlements().length > 0 ? (
                  <div className="space-y-3">
                    {calculateSettlements().map((settlement, index) => (
                      <div key={index} className="p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl border border-white/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {index + 1}
                            </span>
                            <span className="text-white">
                              <strong>{getPersonName(settlement.from)}</strong> pays <strong>{getPersonName(settlement.to)}</strong>
                            </span>
                          </div>
                          <span className="text-xl font-bold text-white">${settlement.amount.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 bg-emerald-500/20 backdrop-blur-sm rounded-xl border border-emerald-400/30 text-center">
                    <Check className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                    <p className="text-white font-medium">Everyone is already settled up!</p>
                    <p className="text-white/70 text-sm">No payments needed.</p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowResults(false)}
                className="w-full px-6 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105 border border-white/20"
              >
                <Edit3 className="w-5 h-5" />
                Back to Edit Expenses
              </button>
            </div>
          </div>
        )}

        {/* Expense Form Modal */}
        {showExpenseForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 w-full max-w-md">
              <h3 className="text-xl font-bold text-white mb-4">Add New Expense</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white/90 text-sm font-medium mb-2">Category</label>
                  <div className="flex gap-2 flex-wrap">
                    {categories.map((cat) => (
                      <button
                        key={cat.emoji}
                        onClick={() => setNewExpense({ ...newExpense, category: cat.emoji })}
                        className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                          newExpense.category === cat.emoji
                            ? 'bg-blue-500 text-white'
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        {cat.emoji} {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-white/90 text-sm font-medium mb-2">Description</label>
                  <input
                    type="text"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                    placeholder="e.g., Dinner at restaurant"
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>

                <div>
                  <label className="block text-white/90 text-sm font-medium mb-2">Amount ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                    placeholder="0.00"
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>

                <div>
                  <label className="block text-white/90 text-sm font-medium mb-2">Who paid?</label>
                  <select
                    value={newExpense.paidBy}
                    onChange={(e) => setNewExpense({ ...newExpense, paidBy: e.target.value })}
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <option value="">Select person</option>
                    {people.map((person) => (
                      <option key={person.id} value={person.id} className="bg-gray-800">
                        {person.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white/90 text-sm font-medium mb-2">Who participated?</label>
                  <div className="space-y-2">
                    {people.map((person) => (
                      <label key={person.id} className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newExpense.participants.includes(person.id)}
                          onChange={() => toggleParticipant(person.id)}
                          className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                        />
                        <span className="text-white">{person.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowExpenseForm(false)}
                  className="flex-1 px-4 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={addExpense}
                  className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all duration-200"
                >
                  Add Expense
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;