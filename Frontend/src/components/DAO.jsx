import React, { useState } from "react";
import Layout from "./Layout";
import "./DAO.css";

const DAO = () => {
  const [activeTab, setActiveTab] = useState("proposals");
  const [voteFilter, setVoteFilter] = useState("active");
  const [sortBy, setSortBy] = useState("newest");

  const proposals = [
    {
      id: 1,
      title: "Add Manga-Inspired NFT Category",
      description:
        "Create a dedicated category for manga-inspired artwork on the platform.",
      author: "@manga_lover",
      votes: { yes: 245, no: 68 },
      status: "active",
      endsIn: "2 days",
      date: "2025-05-14",
    },
    {
      id: 2,
      title: "Increase Royalty Percentages by 2%",
      description:
        "Proposal to increase the royalty percentage for all artists by an additional 2%.",
      author: "@artistsunite",
      votes: { yes: 189, no: 156 },
      status: "active",
      endsIn: "4 days",
      date: "2025-05-15",
    },
    {
      id: 3,
      title: "Partnership with AniChain Network",
      description:
        "Form strategic partnership with AniChain for cross-promotion and expanded marketplace.",
      author: "@crypto_weeb",
      votes: { yes: 312, no: 27 },
      status: "passed",
      result: "Approved",
      date: "2025-05-10",
    },
    {
      id: 4,
      title: "Weekly Creator Spotlight Contest",
      description:
        "Implement a weekly contest to feature creators with the most innovative anime-reality fusions.",
      author: "@contest_king",
      votes: { yes: 276, no: 53 },
      status: "passed",
      result: "Approved",
      date: "2025-05-08",
    },
    {
      id: 5,
      title: "Reduce Validator Requirements",
      description:
        "Lower the requirements needed to become a validator to increase participation.",
      author: "@newbie_artist",
      votes: { yes: 98, no: 231 },
      status: "failed",
      result: "Rejected",
      date: "2025-05-05",
    },
    {
      id: 6,
      title: "Change Platform Color Theme",
      description:
        "Proposal to update the color scheme from purple to blue gradient for better visual appeal.",
      author: "@design_otaku",
      votes: { yes: 132, no: 157 },
      status: "failed",
      result: "Rejected",
      date: "2025-05-02",
    },
  ];

  const stats = {
    communityMembers: 15420,
    activeValidators: 3845,
    treasuryBalance: "125.7 ETH",
    proposalsCreated: 96,
    proposalsPassed: 64,
    averageParticipation: "72%",
  };

  const filterProposals = () => {
    let filtered = [...proposals];

    // Filter by status
    if (voteFilter !== "all") {
      filtered = filtered.filter((proposal) => proposal.status === voteFilter);
    }

    // Sort
    if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === "most-votes") {
      filtered.sort(
        (a, b) => b.votes.yes + b.votes.no - (a.votes.yes + a.votes.no)
      );
    } else if (sortBy === "most-support") {
      filtered.sort(
        (a, b) =>
          b.votes.yes / (b.votes.yes + b.votes.no) -
          a.votes.yes / (a.votes.yes + a.votes.no)
      );
    }

    return filtered;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-blue-700";
      case "passed":
        return "bg-green-700";
      case "failed":
        return "bg-red-700";
      default:
        return "bg-gray-700";
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const filteredProposals = filterProposals();

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Hero Section with Background */}
        <div className="relative w-full h-screen overflow-hidden mb-8">
          {/* Background Image */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/soc15.jpg')", // Use your desired image
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Hero Content */}
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                DAO Governance
              </h1>
              <p className="text-xl text-white-300">
                Shape the future of our platform together
              </p>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 pb-12">
          {/* Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 bg-gray-800 p-2 rounded-xl">
              <button
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === "dashboard"
                    ? "bg-blue-400  text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
                onClick={() => setActiveTab("dashboard")}
              >
                Dashboard
              </button>
              <button
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === "proposals"
                    ? "bg-blue-400  text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
                onClick={() => setActiveTab("proposals")}
              >
                Proposals
              </button>
              <button
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === "voting"
                    ? "bg-blue-400  text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
                onClick={() => setActiveTab("voting")}
              >
                My Voting Power
              </button>
              <button
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === "create"
                    ? "bg-blue-400  text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
                onClick={() => setActiveTab("create")}
              >
                Create Proposal
              </button>
            </div>
          </div>

          {/* Dashboard Stats */}
          {activeTab === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-800 p-6 rounded-xl">
                <div className="flex items-center">
                  <div className="text-3xl text-purple-500 mr-4">👥</div>
                  <div>
                    <h3 className="text-2xl font-bold">
                      {stats.communityMembers.toLocaleString()}
                    </h3>
                    <p className="text-gray-400">Community Members</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl">
                <div className="flex items-center">
                  <div className="text-3xl text-blue-500 mr-4">✅</div>
                  <div>
                    <h3 className="text-2xl font-bold">
                      {stats.activeValidators.toLocaleString()}
                    </h3>
                    <p className="text-gray-400">Active Validators</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl">
                <div className="flex items-center">
                  <div className="text-3xl text-green-500 mr-4">💰</div>
                  <div>
                    <h3 className="text-2xl font-bold">
                      {stats.treasuryBalance}
                    </h3>
                    <p className="text-gray-400">Treasury Balance</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl">
                <div className="flex items-center">
                  <div className="text-3xl text-yellow-500 mr-4">📄</div>
                  <div>
                    <h3 className="text-2xl font-bold">
                      {stats.proposalsCreated}
                    </h3>
                    <p className="text-gray-400">Proposals Created</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl">
                <div className="flex items-center">
                  <div className="text-3xl text-green-500 mr-4">✔️</div>
                  <div>
                    <h3 className="text-2xl font-bold">
                      {stats.proposalsPassed}
                    </h3>
                    <p className="text-gray-400">Proposals Passed</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl">
                <div className="flex items-center">
                  <div className="text-3xl text-purple-500 mr-4">📊</div>
                  <div>
                    <h3 className="text-2xl font-bold">
                      {stats.averageParticipation}
                    </h3>
                    <p className="text-gray-400">Avg. Participation</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Proposals Content */}
          {activeTab === "proposals" && (
            <>
              {/* Filters */}
              <div className="mb-8 flex flex-wrap gap-4 items-center bg-gray-800 p-4 rounded-xl">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Status:</label>
                  <select
                    value={voteFilter}
                    onChange={(e) => setVoteFilter(e.target.value)}
                    className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 "
                  >
                    <option value="all">All Proposals</option>
                    <option value="active">Active</option>
                    <option value="passed">Passed</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Sort By:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 "
                  >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="most-votes">Most Votes</option>
                    <option value="most-support">Most Support</option>
                  </select>
                </div>

                <div className="ml-auto flex">
                  <input
                    type="text"
                    placeholder="Search proposals..."
                    className="bg-gray-700 text-white px-4 py-2 rounded-l-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 "
                  />
                  <button className="bg-blue-400  hover:bg-purple-700 px-4 py-2 rounded-r-lg">
                    🔍
                  </button>
                </div>
              </div>

              {/* Proposals List */}
              <div className="space-y-4">
                {filteredProposals.map((proposal) => (
                  <div
                    key={proposal.id}
                    className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-xl">{proposal.title}</h3>
                      <div
                        className={`${getStatusColor(
                          proposal.status
                        )} text-white px-3 py-1 rounded-lg text-sm font-medium`}
                      >
                        {getStatusText(proposal.status)}
                      </div>
                    </div>
                    <p className="text-gray-400 mb-4">{proposal.description}</p>
                    <div className="flex items-center text-sm text-gray-400 mb-4">
                      <div className="w-6 h-6 bg-gray-600 rounded-full mr-2 flex items-center justify-center">
                        👤
                      </div>
                      <span>Proposed by {proposal.author}</span>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-green-400">
                          Yes: {proposal.votes.yes}
                        </span>
                        <span className="text-sm text-red-400">
                          No: {proposal.votes.no}
                        </span>
                      </div>
                      <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-2 bg-gradient-to-r from-blue-400  to-blue-600 rounded-full"
                          style={{
                            width: `${
                              (proposal.votes.yes /
                                (proposal.votes.yes + proposal.votes.no)) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-400">
                        {proposal.status === "active" ? (
                          <span>Ends in {proposal.endsIn}</span>
                        ) : (
                          <span>Result: {proposal.result}</span>
                        )}
                      </div>
                      {proposal.status === "active" && (
                        <div className="flex space-x-2">
                          <button className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg transition-colors">
                            Vote Yes
                          </button>
                          <button className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg transition-colors">
                            Vote No
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Voting Power Content */}
          {activeTab === "voting" && (
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="text-center mb-8">
                <div className="w-32 h-32 mx-auto bg-gradient-to-r from-blue-400  to-blue-600 rounded-full flex items-center justify-center mb-4">
                  <div>
                    <div className="text-3xl font-bold">28.5</div>
                    <div className="text-sm">Voting Power</div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">
                  Your Voting Power Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="text-xl font-bold mb-1">2.5</div>
                    <div className="text-sm text-gray-400">
                      Base Voting Power
                    </div>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="text-xl font-bold mb-1">14.3</div>
                    <div className="text-sm text-gray-400">NFT Holdings</div>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="text-xl font-bold mb-1">8.7</div>
                    <div className="text-sm text-gray-400">
                      Validator Status
                    </div>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="text-xl font-bold mb-1">3.0</div>
                    <div className="text-sm text-gray-400">Loyalty Bonus</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Your Voting History</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-700">
                        <th className="text-left p-3 rounded-tl-lg">
                          Proposal
                        </th>
                        <th className="text-left p-3">Your Vote</th>
                        <th className="text-left p-3">Outcome</th>
                        <th className="text-left p-3 rounded-tr-lg">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-700">
                        <td className="p-3">
                          Partnership with AniChain Network
                        </td>
                        <td className="p-3 text-green-500 font-medium">Yes</td>
                        <td className="p-3 text-green-500 font-medium">
                          Passed
                        </td>
                        <td className="p-3">May 10, 2025</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-3">
                          Weekly Creator Spotlight Contest
                        </td>
                        <td className="p-3 text-green-500 font-medium">Yes</td>
                        <td className="p-3 text-green-500 font-medium">
                          Passed
                        </td>
                        <td className="p-3">May 8, 2025</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-3">Reduce Validator Requirements</td>
                        <td className="p-3 text-red-500 font-medium">No</td>
                        <td className="p-3 text-red-500 font-medium">Failed</td>
                        <td className="p-3">May 5, 2025</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Create Proposal Content */}
          {activeTab === "create" && (
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-6">Create a New Proposal</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Proposal Title
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 "
                    placeholder="Enter a descriptive title for your proposal"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category
                  </label>
                  <select className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ">
                    <option value="">Select a category</option>
                    <option value="platform">Platform Change</option>
                    <option value="financial">Financial Decision</option>
                    <option value="partnership">Partnership</option>
                    <option value="feature">New Feature</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400  min-h-32 resize-vertical"
                    placeholder="Provide a detailed description of your proposal and its benefits to the community"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Voting Period
                  </label>
                  <select className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ">
                    <option value="3">3 Days</option>
                    <option value="5">5 Days</option>
                    <option value="7">7 Days</option>
                    <option value="14">14 Days</option>
                  </select>
                </div>

                <div className="p-4 bg-gray-700 rounded-lg">
                  <h4 className="font-medium mb-2">Requirements to Submit</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✅</span>
                      Minimum 5.0 voting power
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✅</span>
                      At least 30 days as a member
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✅</span>
                      Must own at least 1 NFT
                    </li>
                  </ul>
                </div>

                <button className="w-full bg-blue-400  hover:bg-purple-700 text-white py-4 rounded-lg font-bold text-lg transition-colors">
                  Submit Proposal
                </button>
              </div>
            </div>
          )}

          {/* Pagination for proposals */}
          {activeTab === "proposals" && (
            <div className="mt-8 flex justify-center">
              <div className="flex items-center space-x-2">
                <button className="px-3 py-2 bg-gray-700 text-gray-400 rounded-lg hover:bg-gray-600 hover:text-white transition-colors">
                  ←
                </button>
                <button className="px-3 py-2 bg-blue-400  text-white rounded-lg">
                  1
                </button>
                <button className="px-3 py-2 bg-gray-700 text-gray-400 rounded-lg hover:bg-gray-600 hover:text-white transition-colors">
                  2
                </button>
                <button className="px-3 py-2 bg-gray-700 text-gray-400 rounded-lg hover:bg-gray-600 hover:text-white transition-colors">
                  3
                </button>
                <span className="px-2 text-gray-400">...</span>
                <button className="px-3 py-2 bg-gray-700 text-gray-400 rounded-lg hover:bg-gray-600 hover:text-white transition-colors">
                  5
                </button>
                <button className="px-3 py-2 bg-gray-700 text-gray-400 rounded-lg hover:bg-gray-600 hover:text-white transition-colors">
                  →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DAO;
